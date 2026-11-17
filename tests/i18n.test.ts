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

it.each([
  ["comma_decimal", "1,234.5"],
  ["decimal_comma", "1.234,5"],
  ["space_comma", "1\u202f234,5"],
  ["quote_decimal", "1'234.5"],
  ["none", "1234.5"],
])(
  "honors HA %s number preference without changing language",
  (preference, expected) => {
    const h = {
      language: "nb-NO",
      locale: { language: "nb-NO", number_format: preference },
    } as Hass;
    expect(number(h, 1234.5).replaceAll("\u2019", "'")).toBe(expected);
    expect(language(h)).toBe("nb");
  },
);
