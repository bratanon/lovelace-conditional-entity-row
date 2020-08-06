import { LitElement, html, customElement, property, TemplateResult, PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { ConditionalEntityRowConfig } from './types';
import * as pack from '../package.json';

/* eslint-disable-next-line no-console */
console.debug(
  `%c ${pack.name.toUpperCase()} %c${pack.version} IS INSTALLED`,
  'color: white; font-weight: bold; background: blue',
  'color: white; font-weight: bold; background: blue',
);

@customElement('conditional-entity-row')
export class ConditionalEntityRow extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() private _config!: ConditionalEntityRowConfig;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @property() private _helpers?: any;

  public setConfig(config: ConditionalEntityRowConfig): void {
    if (!config.entity) {
      throw new Error('Specify an entity.');
    }

    this._config = {
      ...config,
    };

    this.loadCardHelpers();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) {
      return true;
    }

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass) {
      const entity_old = oldHass.states[this._config.entity];
      const entity_current = this.hass.states[this._config.entity];
      const condition_entity_old = oldHass.states[this._config.condition.entity];
      const condition_entity_current = this.hass.states[this._config.condition.entity];

      return entity_old !== entity_current || condition_entity_old !== condition_entity_current;
    }
    return true;
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass || !this._helpers) {
      return html``;
    }

    const conditionEntity = this.hass.states[this._config.condition.entity];
    if (conditionEntity.state !== this._config.condition.state) {
      return html``;
    }

    const defaultRowConfig = Object.assign({}, this._config);
    delete defaultRowConfig['type'];
    delete defaultRowConfig['condition'];
    const element = this._helpers.createRowElement(defaultRowConfig);
    element.hass = this.hass;

    return html`
      ${element}
    `;
  }

  private async loadCardHelpers(): Promise<void> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    this._helpers = await (window as any).loadCardHelpers();
  }
}
