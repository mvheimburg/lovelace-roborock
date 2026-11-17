import { LitElement, html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import {
  HistoryController,
  historyConnection,
  loadSeries,
  historyDialog,
  openHistoryDialog,
  historyFormat,
  historyStrings,
  historyStyles,
  lineChart,
  lineChartTimeAt,
  valueAt,
  type Series,
  type Source,
} from "lovelace-card-history";
import type { Config, Hass, Snapshot, MapSnapshot, Entity } from "./types";
import { strings, number, optionLabel } from "./i18n";
import { styles } from "./styles";
import { snapshot, bindings, publicMaps } from "./api";
import "./editor";
import "./map-view";

export class RoborockCard extends LitElement {
  static properties = {
    config: { state: true },
    snapshot: { state: true },
    mapData: { state: true },
    related: { state: true },
    selected: { state: true },
    pending: { state: true },
    error: { state: true },
  };
  static styles = [styles, historyStyles];
  private config?: Config;
  private ha?: Hass;
  private snapshot?: Snapshot;
  private mapData: MapSnapshot[] = [];
  private related: string[] = [];
  private selected: number[] = [];
  private pending = false;
  private activeAction?: symbol;
  private error = "";
  private epoch = 0;
  private unsubscribe?: () => void;
  private loadedFor = "";
  private history = new HistoryController<Series[]>(
    this,
    async (range, end) => {
      if (!this.ha) throw Error("unavailable");
      return loadSeries(
        historyConnection({ callWS: this.ha.callWS.bind(this.ha) }),
        this.sources(),
        this.ha.states,
        range,
        { now: end },
      );
    },
  );
  get hass() {
    return this.ha;
  }
  set hass(hass: Hass | undefined) {
    this.ha = hass;
    if (
      hass &&
      this.config &&
      this.loadedFor !== this.config.entity &&
      this.isConnected
    )
      void this.load();
    this.requestUpdate();
  }
  setConfig(config: Config) {
    if (!config.entity?.startsWith("vacuum."))
      throw Error("Choose a vacuum entity");
    if (config.appearance && !["default", "bubble"].includes(config.appearance))
      throw Error("Invalid appearance");
    if (config.entity !== this.config?.entity) {
      this.epoch++;
      this.loadedFor = "";
      this.unsubscribe?.();
      this.unsubscribe = undefined;
      this.snapshot = undefined;
      this.mapData = [];
      this.related = [];
      this.selected = [];
      this.pending = false;
      this.activeAction = undefined;
      this.error = "";
      this.history.reset();
    }
    this.config = { ...config };
    this.setAttribute("appearance", config.appearance || "default");
    if (this.ha && this.isConnected && this.loadedFor !== config.entity)
      void this.load();
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.ha && this.config && this.loadedFor !== this.config.entity)
      void this.load();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.epoch++;
    this.loadedFor = "";
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
  private async load() {
    const h = this.ha,
      id = this.config?.entity;
    if (!h || !id) return;
    this.loadedFor = id;
    const ticket = ++this.epoch;
    const valid = () =>
      ticket === this.epoch && this.isConnected && this.config?.entity === id;
    const work = [
      (async () => {
        try {
          const ids = await bindings(h, id);
          if (valid()) this.related = ids;
        } catch {
          /* Explicit editor bindings remain available. */
        }
      })(),
      (async () => {
        try {
          const s = await snapshot(h, id);
          if (!valid()) return;
          this.snapshot = s;
          this.mapData = s.maps;
          if (h.connection) {
            const unsub = await h.connection.subscribeMessage<Snapshot>(
              (value) => {
                if (
                  valid() &&
                  value.api_version === 1 &&
                  value.entity_id === id
                ) {
                  if (this.snapshot?.current_map !== value.current_map)
                    this.selected = [];
                  this.snapshot = value;
                  this.mapData = value.maps;
                }
              },
              { type: "roborock_companion/subscribe", entity_id: id },
            );
            if (valid()) this.unsubscribe = unsub;
            else unsub();
          }
        } catch {
          try {
            const maps = await publicMaps(h, id);
            if (valid()) this.mapData = maps;
          } catch {
            /* Companion is optional; keep public controls usable. */
          }
        }
      })(),
    ];
    await Promise.allSettled(work);
    if (valid()) this.requestUpdate();
  }
  private get robot() {
    return this.ha && this.config
      ? this.ha.states[this.config.entity]
      : undefined;
  }
  private get available() {
    return (
      !!this.robot && !["unknown", "unavailable"].includes(this.robot.state)
    );
  }
  private get entities() {
    return [...new Set([...this.related, ...(this.config?.entities || [])])]
      .map((id) => this.ha?.states[id])
      .filter((v): v is Entity => !!v);
  }
  private get map() {
    return (
      this.mapData.find((m) => m.active) ||
      (this.mapData.length === 1 ? this.mapData[0] : undefined)
    );
  }
  private toggleRoom(id: number) {
    this.selected = this.selected.includes(id)
      ? this.selected.filter((v) => v !== id)
      : [...this.selected, id];
  }
  private async action(
    domain: string,
    service: string,
    data: Record<string, unknown>,
  ) {
    if (this.pending || !this.available || !this.ha) return;
    const epoch = this.epoch;
    const action = Symbol();
    this.activeAction = action;
    this.pending = true;
    this.error = "";
    try {
      await this.ha.callService(domain, service, data);
    } catch {
      if (epoch === this.epoch) this.error = strings(this.ha).failed;
    } finally {
      if (this.activeAction === action) {
        this.activeAction = undefined;
        this.pending = false;
        this.requestUpdate();
      }
    }
  }
  private async cleanRooms() {
    if (!this.map || !this.selected.length || !this.config) return;
    await this.action("vacuum", "clean_segments", {
      entity_id: this.config.entity,
      segment_ids: this.selected.map((id) => `${this.map!.id}_${id}`),
    });
  }
  private sources(): (Source & { name: string })[] {
    return this.entities
      .filter(
        (e) =>
          e.entity_id.startsWith("sensor.") &&
          ((Number.isFinite(Number(e.state)) && e.state.trim() !== "") ||
            typeof e.attributes.unit_of_measurement === "string"),
      )
      .slice(0, 6)
      .map((e, index) => ({
        entityId: e.entity_id,
        name: String(e.attributes.friendly_name || e.entity_id),
        unit: String(e.attributes.unit_of_measurement || ""),
        color: index,
        tag: e.entity_id,
      }));
  }
  private reading(entity: Entity) {
    if (!this.available || ["unknown", "unavailable"].includes(entity.state))
      return strings(this.ha).unknown;
    if (this.ha?.formatEntityState) return this.ha.formatEntityState(entity);
    const value = Number(entity.state);
    return Number.isFinite(value)
      ? `${number(this.ha, value)} ${entity.attributes.unit_of_measurement || ""}`.trim()
      : entity.state;
  }
  private async openHistory(event: Event) {
    await this.updateComplete;
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>("#history");
    if (dialog)
      await openHistoryDialog(
        this.history,
        this.renderRoot,
        this,
        historyStrings(this.ha).failed,
        event.currentTarget as HTMLElement,
      );
  }
  private historyView() {
    const t = historyStrings(this.ha),
      format = historyFormat(this.ha);
    return historyDialog(this.history, {
      strings: t,
      format,
      subtitle:
        this.config?.title ||
        String(this.robot?.attributes.friendly_name || "Roborock"),
      chart: (data, [start, end], hover, width) =>
        lineChart(
          data,
          start,
          end,
          hover,
          {
            ...format,
            number: (value, digits) => number(this.ha, value, digits),
            label: t.history,
          },
          { width, maxUnits: 3 },
        ),
      isEmpty: (data) =>
        !data.some((s) => s.points.some((p) => p[1] !== undefined)),
      timeAt: (event, svg, [start, end], data) =>
        lineChartTimeAt(
          event,
          svg,
          start,
          end,
          Math.min(3, new Set(data.map((s) => s.unit)).size),
        ),
      legend: (data, time) =>
        data.map((s) => {
          const value =
            time === undefined
              ? Number(this.ha?.states[s.entityId]?.state)
              : valueAt(s, time);
          return {
            entityId: s.entityId,
            name: String(
              this.ha?.states[s.entityId]?.attributes.friendly_name ||
                s.entityId,
            ),
            color: s.color,
            value:
              value === undefined || !Number.isFinite(value)
                ? t.unavailable
                : `${number(this.ha, value)} ${s.unit}`,
          };
        }),
      select: (entityId) =>
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            detail: { entityId },
            bubbles: true,
            composed: true,
          }),
        ),
    });
  }
  render() {
    if (!this.config) return nothing;
    const t = strings(this.ha),
      robot = this.robot,
      disabled = this.pending || !this.available;
    const title =
      this.config.title ||
      String(robot?.attributes.friendly_name || "Roborock");
    const state = this.available
      ? (t as Record<string, string>)[robot!.state] || robot!.state
      : t.unavailable;
    const controls = this.entities.filter(
      (e) =>
        e.entity_id.startsWith("select.") ||
        e.entity_id.startsWith("switch.") ||
        e.entity_id.startsWith("button."),
    );
    return html`<ha-card
        ><header>
          <div>
            <h2>${title}</h2>
            <p class="hint">${state}</p>
          </div>
          <a
            class="button cog"
            aria-label=${t.configure}
            title=${t.configure}
            href=${this.snapshot ? `/roborock-companion?entity_id=${encodeURIComponent(this.config.entity)}` : "/config/integrations/integration/roborock"}
            ><ha-icon icon="mdi:cog"></ha-icon
          ></a>
        </header>
        ${this.config.show_map !== false ? html`<roborock-map .hass=${this.ha} .map=${this.map} .selected=${this.selected} .disabled=${disabled} @room-select=${(e: CustomEvent<number>) => this.toggleRoom(e.detail)}></roborock-map>` : nothing}${this.map?.rooms.length ? html`<div class="chips" aria-label=${t.rooms}>${this.map.rooms.map((room) => html`<button type="button" aria-pressed=${String(this.selected.includes(room.id))} ?disabled=${disabled} @click=${() => this.toggleRoom(room.id)}>${room.name}</button>`)}</div>` : nothing}
        <div class="actions">
          <button
            class="primary"
            data-action="start"
            type="button"
            ?disabled=${disabled}
            @click=${() => (this.selected.length ? void this.cleanRooms() : void this.action("vacuum", "start", { entity_id: this.config!.entity }))}
          >
            ${this.selected.length ? t.cleanRooms : t.start}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "pause", { entity_id: this.config!.entity })}
          >
            ${t.pause}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "return_to_base", { entity_id: this.config!.entity })}
          >
            ${t.home}</button
          ><button
            type="button"
            ?disabled=${disabled}
            @click=${() => void this.action("vacuum", "stop", { entity_id: this.config!.entity })}
          >
            ${t.stop}
          </button>
          ${Number(robot?.attributes.supported_features || 0) & 512 ? html`<button type="button" ?disabled=${disabled} @click=${() => void this.action("vacuum", "locate", { entity_id: this.config!.entity })}>${t.locate}</button>` : nothing}
        </div>
        ${
          Array.isArray(robot?.attributes.fan_speed_list)
            ? html`<label
                >${t.suction}<select
                  .value=${live(String(robot?.attributes.fan_speed || ""))}
                  ?disabled=${disabled}
                  @change=${(e: Event) => void this.action("vacuum", "set_fan_speed", { entity_id: this.config!.entity, fan_speed: (e.target as HTMLSelectElement).value })}
                >
                  ${(robot!.attributes.fan_speed_list as string[]).map((value) => html`<option value=${value}>${optionLabel(this.ha, value)}</option>`)}
                </select></label
              >`
            : nothing
        }${controls.map((e) =>
          e.entity_id.startsWith("select.")
            ? html`<label
                >${String(e.attributes.friendly_name || e.entity_id)}<select
                  .value=${live(e.state)}
                  ?disabled=${disabled || ["unknown", "unavailable"].includes(e.state)}
                  @change=${(event: Event) => void this.action("select", "select_option", { entity_id: e.entity_id, option: (event.target as HTMLSelectElement).value })}
                >
                  ${((e.attributes.options as string[]) || []).map((value) => html`<option value=${value}>${optionLabel(this.ha, value)}</option>`)}
                </select></label
              >`
            : e.entity_id.startsWith("button.")
              ? html`<button
                  type="button"
                  ?disabled=${disabled || e.state === "unavailable"}
                  @click=${() => void this.action("button", "press", { entity_id: e.entity_id })}
                >
                  ${String(e.attributes.friendly_name || e.entity_id)}
                </button>`
              : html`<button
                  type="button"
                  aria-pressed=${String(e.state === "on")}
                  ?disabled=${disabled || ["unknown", "unavailable"].includes(e.state)}
                  @click=${() => void this.action("switch", e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id })}
                >
                  ${String(e.attributes.friendly_name || e.entity_id)}
                </button>`,
        )}${
          this.config.show_maintenance !== false
            ? html`<div class="measurements section">
                ${this.sources().map((source) => {
                  const e = this.ha!.states[source.entityId];
                  return html`<button
                    class="reading"
                    type="button"
                    @click=${(event: Event) => void this.openHistory(event)}
                  >
                    <span class="muted">${source.name}</span
                    ><strong>${this.reading(e)}</strong>
                  </button>`;
                })}
              </div>`
            : nothing
        }
        <div
          class="feedback"
          role=${this.error ? "alert" : "status"}
          aria-live="polite"
        >
          ${this.error || (this.pending ? t.pending : "")}
        </div></ha-card
      >${this.historyView()}`;
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }
  static getConfigElement() {
    return document.createElement("roborock-card-editor");
  }
  static getStubConfig(hass?: Hass) {
    return {
      type: "custom:roborock-card",
      entity:
        Object.keys(hass?.states || {}).find((id) =>
          id.startsWith("vacuum."),
        ) || "vacuum.robot",
      show_map: true,
      show_maintenance: true,
    };
  }
}
if (!customElements.get("roborock-card"))
  customElements.define("roborock-card", RoborockCard);
const cards = ((
  window as unknown as {
    customCards: { type: string; name: string; description: string }[];
  }
).customCards ||= []);
if (!cards.some((c) => c.type === "roborock-card"))
  cards.push({
    type: "roborock-card",
    name: "Roborock",
    description: "Maps, rooms and cleaning controls through Home Assistant.",
  });
