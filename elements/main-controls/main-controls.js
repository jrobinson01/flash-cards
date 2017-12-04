import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class MainControls extends TaDom.TaDomElement {

  static get css() {
    // return link({rel:'stylesheet', href:'/elements/main-controls/main-controls.css'});
    return `
    button {
      background: var(--blue);
      margin: 1rem;
      padding: 1rem 3rem;
      font-size: 1.5rem;
      font-family: Quicksand, sans-serif;
      color: var(--white);
      box-shadow: var(--box-shadow);
      cursor: pointer;
    }
    `;
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
        button({'on-click': event => this.dispatchEvent('quit')}, 'Quit')
      )
    )

  }
};

export const mainControls = TaDom.customElement('main-controls', MainControls);
