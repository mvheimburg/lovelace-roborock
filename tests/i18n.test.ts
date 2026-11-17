import { expect, it } from "vitest";
import { language, locale, number, strings } from "../src/i18n";
import type { Hass } from "../src/types";
it("supports aliases independently from regional formatting and tolerates malformed locales", () => {
  for (const languageTag of ["nb", "nb_NO", "NB-no", "no", "nn-NO"]) {
    const hass = { language: languageTag } as Hass;
    expect(language(hass)).toBe("nb");
    expect(strings(hass).configure).toBe("Konfigurer");
  }
  expect(
    locale({ language: "en", locale: { language: "en-GB" } } as Hass),
  ).toBe("en-GB");
  expect(number({ language: "nb" } as Hass, 12.5)).toBe("12,5");
  expect(() => locale({ language: "invalid_tag_!?" } as Hass)).not.toThrow();
  expect(strings({ locale: { language: "nb-NO" } } as Hass).save).toBe(
    "Lagre endringer",
  );
});

it("honors HA number and clock preferences without changing language", () => {
  const h = {
    language: "en-GB",
    locale: {
      language: "en-GB",
      number_format: "comma_decimal",
      time_format: "12",
    },
    config: { time_zone: "UTC" },
  } as Hass;
  expect(number(h, 1234.5)).toBe("1.234,5");
  expect(language(h)).toBe("en");
});
