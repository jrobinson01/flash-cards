import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class MainControls extends TaDom.TaDomElement {

  static get css() {
    return link({rel:'stylesheet', href:'/elements/main-controls/main-controls.css'});
  }

  static get observedAttributes() {
    return [];
  }

  static get properties() {
    return {};
  }

  render() {
    return (
      div(
        button({'on-click': event => this.dispatchEvent('quit')}, 'Quit'),
        button({'on-click': event => this.dispatchEvent('reset')}, 'Reset')
      )
    )

  }
};

export const mainControls = TaDom.customElement('main-controls', MainControls);
