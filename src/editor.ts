import { LitElement, html } from "lit";
import type { Config, Hass } from "./types";
import { strings } from "./i18n";
import { styles } from "./styles";
export class RoborockEditor extends LitElement {
  static properties = { hass: { attribute: false }, config: { state: true } };
  static styles = styles;
  hass?: Hass;
  private config?: Config;
  setConfig(config: Config) {
    this.config = { ...config };
  }
  private change(key: string, value: unknown) {
    this.config = { ...this.config!, [key]: value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }
  render() {
    if (!this.config) return;
    const t = strings(this.hass);
    return html`<ha-form
      .hass=${this.hass}
      .data=${this.config}
      .schema=${[
        {
          name: "entity",
          required: true,
          selector: { entity: { domain: "vacuum", integration: "roborock" } },
        },
        { name: "title", selector: { text: {} } },
        {
          name: "appearance",
          selector: {
            select: {
              options: [
                { value: "default", label: t.default },
                { value: "bubble", label: t.bubble },
              ],
            },
          },
        },
        { name: "show_map", selector: { boolean: {} } },
        { name: "show_maintenance", selector: { boolean: {} } },
        { name: "entities", selector: { entity: { multiple: true } } },
      ]}
      .computeLabel=${(schema: { name: string }) => ({ entity: t.selectRobot, title: t.title, appearance: t.appearance, show_map: t.showMap, show_maintenance: t.showMaintenance, entities: t.entities })[schema.name]}
      @value-changed=${(e: CustomEvent) => {
        for (const [key, value] of Object.entries(e.detail.value))
          this.change(key, value);
      }}
    ></ha-form>`;
  }
}
if (!customElements.get("roborock-card-editor"))
  customElements.define("roborock-card-editor", RoborockEditor);
