import { expect, it } from "vitest";
import { affine } from "../src/map-view";
it("maps a cropped rotated image to hand checked robot coordinates", () => {
  const transform = affine([
    { vacuum: { x: 20000, y: 20000 }, map: { x: 0, y: 400 } },
    { vacuum: { x: 30000, y: 20000 }, map: { x: 600, y: 400 } },
    { vacuum: { x: 20000, y: 30000 }, map: { x: 0, y: 0 } },
  ])!;
  expect(transform.toRobot({ x: 150, y: 200 })).toEqual({ x: 22500, y: 25000 });
  expect(transform.toMap({ x: 27500, y: 25000 })).toEqual({ x: 450, y: 200 });
  expect(
    affine([
      { vacuum: { x: 0, y: 0 }, map: { x: 0, y: 0 } },
      { vacuum: { x: 1, y: 1 }, map: { x: 1, y: 1 } },
      { vacuum: { x: 2, y: 2 }, map: { x: 2, y: 2 } },
    ]),
  ).toBeUndefined();
});

it("keeps the image and coordinate overlay at the same aspect on a narrow card", async () => {
  const element = document.createElement(
    "roborock-map",
  ) as import("../src/map-view").RoborockMap;
  element.style.width = "300px";
  element.hass = {
    fetchWithAuth: async () =>
      new Response(
        new Blob(
          [
            '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"></svg>',
          ],
          { type: "image/svg+xml" },
        ),
        { status: 200 },
      ),
  } as import("../src/types").Hass;
  element.map = {
    id: 0,
    name: "Map",
    width: 600,
    height: 400,
    image_url: "/dummy",
    calibration: [
      { vacuum: { x: 0, y: 0 }, map: { x: 0, y: 0 } },
      { vacuum: { x: 100, y: 0 }, map: { x: 600, y: 0 } },
      { vacuum: { x: 0, y: 100 }, map: { x: 0, y: 400 } },
    ],
    rooms: [],
    walls: [],
    no_go: [],
    no_mop: [],
    path: [],
    active: true,
    preservation_complete: true,
  };
  document.body.append(element);
  await new Promise((r) => setTimeout(r, 80));
  await element.updateComplete;
  const image = element.shadowRoot!.querySelector("img")!;
  await image.decode();
  expect(image.getBoundingClientRect().height).toBeCloseTo(200, 0);
  expect(
    element.shadowRoot!.querySelector("svg")!.getBoundingClientRect().height,
  ).toBeCloseTo(200, 0);
  element.remove();
});
