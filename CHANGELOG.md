# Changelog

## 0.1.1 — 2026-11-17

- Provide a dedicated Mosquitto container in the existing Docker support stack, with a private network, persistent volume and MQTT health dependency.
- Document upstream external-broker configuration, migration from embedded mode and backup of broker data.

## 0.1.0 — 2026-11-17

- Add everyday Roborock controls, room selection, registry-based bindings and a visual editor.
- Add a map surface and a link to the companion's desktop/tablet configuration panel.
- Support English/Bokmål, regional formatting, default/Bubble and recorder history.
- Keep standard controls usable without the companion and block duplicate/unavailable actions.
- Use map-qualified public room cleaning, expose official dock buttons and Locate, and preserve pending-action safety across reconnects.
- Honor the actual Home Assistant numeric-format preference values.
