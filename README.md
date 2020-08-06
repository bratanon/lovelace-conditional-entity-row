conditional-entity-row
=================
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

Show or hide an entity row based on a condition.

## Install

*This is available in [HACS](https://github.com/custom-components/hacs) (Home Assistant Community Store)*

### Manual install
1. Download and copy `conditional-entity-row.js` from the [latest release](https://github.com/bratanon/lovelace-conditional-entity-row/releases/latest) into your `config/www` directory.

2. Add a reference to `conditional-entity-row.js` inside your `ui-lovelace.yaml` or through the raw config editor interface.

    ```yaml
    resources:
      - url: /local/conditional-entity-row.js
        type: module
    ```

## Usage

### Options

#### Row options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | **required** | `custom:conditional-entity-row`
| condition |  [condition object](#condition-object-options) | **required** | Condition


#### Condition object options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| entity | string | **required** | The entity_id to use in the condition
| state | string | **required** | The state to use in the condition.

When the condition evaluates to "true", the entity will be shown.

### Example usage

```yaml
- type: entities
  show_header_toggle: false
  entities:
    - input_boolean.example_boolean

- type: entities
  show_header_toggle: false
  entities:
    - entity: light.bed_light
      name: 'Bed Light'
      type: custom:conditional-entity-row
      condition:
        entity: input_boolean.example_boolean
        state: 'on'
    - entity: light.ceiling_lights
    - entity: light.kitchen_lights
```

## License
This project is under the MIT license.
