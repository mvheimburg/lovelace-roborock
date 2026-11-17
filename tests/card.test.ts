import { afterEach, describe, expect, it } from "vitest";
import "../src/card";
import type { RoborockCard } from "../src/card";
import type { Hass } from "../src/types";

const base = (): Hass => ({
  language: "en-GB",
  states: {
    "vacuum.robot": {
      entity_id: "vacuum.robot",
      state: "docked",
      attributes: {
        friendly_name: "My robot",
        fan_speed_list: ["balanced", "turbo"],
        fan_speed: "balanced",
      },
    },
  },
  callService: async () => undefined,
  callWS: async () => {
    throw new Error("unknown_command");
  },
});
afterEach(() => document.body.replaceChildren());
async function mount(hass = base()) {
  const card = document.createElement("roborock-card") as RoborockCard;
  card.setConfig({ type: "custom:roborock-card", entity: "vacuum.robot" });
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  return card;
}
describe("everyday card", () => {
  it("renders Norwegian and keeps custom names through live language changes", async () => {
    const h = base();
    h.language = "nb_NO";
    const c = await mount(h);
    expect(c.shadowRoot!.textContent).toContain("Start rengjøring");
    expect(c.shadowRoot!.textContent).toContain("My robot");
    c.hass = { ...h, language: "en-GB" };
    await c.updateComplete;
    expect(c.shadowRoot!.textContent).toContain("Start cleaning");
  });
  it("sends one public HA start and retains configure while unavailable", async () => {
    const h = base();
    const calls: unknown[] = [];
    h.callService = async (...args) => {
      calls.push(args);
    };
    const c = await mount(h);
    (
      c.shadowRoot!.querySelector('[data-action="start"]') as HTMLButtonElement
    ).click();
    await c.updateComplete;
    expect(calls).toEqual([["vacuum", "start", { entity_id: "vacuum.robot" }]]);
    c.hass = {
      ...h,
      states: {
        "vacuum.robot": { ...h.states["vacuum.robot"], state: "unavailable" },
      },
    };
    await c.updateComplete;
    expect(
      (
        c.shadowRoot!.querySelector(
          '[data-action="start"]',
        ) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      c.shadowRoot!.querySelector('a[aria-label="Configure"]'),
    ).not.toBeNull();
  });
  it("prevents duplicate actions and reports rejection", async () => {
    const h = base();
    let reject!: (e: Error) => void;
    let count = 0;
    h.callService = () => {
      count++;
      return new Promise((_, r) => {
        reject = r;
      });
    };
    const c = await mount(h);
    const start = c.shadowRoot!.querySelector(
      '[data-action="start"]',
    ) as HTMLButtonElement;
    start.click();
    start.click();
    expect(count).toBe(1);
    reject(new Error("offline"));
    await new Promise((r) => setTimeout(r, 20));
    expect(
      c.shadowRoot!.querySelector('[role="alert"]')!.textContent,
    ).toContain("failed");
  });
});

it("re-enables a detached card after its obsolete pending request settles", async () => {
  const h = base();
  let finish!: () => void;
  h.callService = () => new Promise<void>((r) => (finish = r));
  const c = await mount(h);
  (
    c.shadowRoot!.querySelector('[data-action="start"]') as HTMLButtonElement
  ).click();
  c.remove();
  finish();
  await Promise.resolve();
  document.body.append(c);
  await c.updateComplete;
  expect(
    (c.shadowRoot!.querySelector('[data-action="start"]') as HTMLButtonElement)
      .disabled,
  ).toBe(false);
});

it("qualifies room cleaning with its floor and exposes official button actions", async () => {
  const h = base(),
    calls: unknown[] = [];
  h.states["vacuum.robot"].attributes.supported_features = 512;
  h.callService = async (...args) => {
    calls.push(args);
  };
  h.states["button.robot_empty"] = {
    entity_id: "button.robot_empty",
    state: "unknown",
    attributes: { friendly_name: "Empty bin" },
  };
  h.callWS = async <T>(m: Record<string, unknown>) => {
    if (m.type === "call_service")
      return {
        response: {
          "vacuum.robot": {
            maps: [{ flag: 0, name: "Floor", rooms: { 16: "Room A" } }],
          },
        },
      } as T;
    throw Error("unknown_command");
  };
  const c = await mount(h);
  c.setConfig({
    type: "custom:roborock-card",
    entity: "vacuum.robot",
    entities: ["button.robot_empty"],
  });
  await new Promise((r) => setTimeout(r, 40));
  await c.updateComplete;
  const room = [...c.shadowRoot!.querySelectorAll("button")].find(
    (e) => e.textContent?.trim() === "Room A",
  )!;
  room.click();
  await c.updateComplete;
  (
    [...c.shadowRoot!.querySelectorAll("button")].find((e) =>
      e.textContent?.includes("Clean selected"),
    ) as HTMLButtonElement
  ).click();
  await new Promise((r) => setTimeout(r, 10));
  expect(calls).toContainEqual([
    "vacuum",
    "clean_segments",
    { entity_id: "vacuum.robot", segment_ids: ["0_16"] },
  ]);
  (
    [...c.shadowRoot!.querySelectorAll("button")].find(
      (e) => e.textContent?.trim() === "Empty bin",
    ) as HTMLButtonElement
  ).click();
  await new Promise((r) => setTimeout(r, 10));
  expect(calls).toContainEqual([
    "button",
    "press",
    { entity_id: "button.robot_empty" },
  ]);
  expect(
    [...c.shadowRoot!.querySelectorAll("button")].some(
      (e) => e.textContent?.trim() === "Find robot",
    ),
  ).toBe(true);
});

it("does not duplicate an unfinished request after reattaching the same card", async () => {
  const h = base();
  let finish!: () => void;
  let calls = 0;
  h.callService = () => {
    calls++;
    return new Promise<void>((r) => (finish = r));
  };
  const c = await mount(h);
  (
    c.shadowRoot!.querySelector('[data-action="start"]') as HTMLButtonElement
  ).click();
  c.remove();
  document.body.append(c);
  await c.updateComplete;
  (
    c.shadowRoot!.querySelector('[data-action="start"]') as HTMLButtonElement
  ).click();
  expect(calls).toBe(1);
  finish();
  await Promise.resolve();
});
