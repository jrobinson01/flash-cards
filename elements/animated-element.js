import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class AnimatedElement extends TaDom.TaDomElement {

  static get css() {
    return `
      /* fades in, does not fade out */
      :host div {
        transition: opacity 1.0s;
        opacity: 0.0;
        visibility: hidden;
        height: 0; /* height 0 to keep from taking up space when hidden */
      }
      :host([visible]) div {
        opacity: 1.0;
        visibility: visible;
      }
    `;
  }

  static get observedAttributes() {
    return ['visible'];
  }

  static get properties() {
    return {
      visible: {
        value: true,
        reflectToAttribute: true
      }
    };
  }

  render() {
    return div(slot());
  }
};

export const animatedElement = TaDom.customElement('animated-element', AnimatedElement);
