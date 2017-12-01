import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class LoginElement extends TaDom.TaDomElement {

  static get css() {
    // return link({rel:'stylesheet', href:'/elements/login-element/login-element.css'});
    return `
    :host {
      display: block;
    }
    form input {
      display: block;
      margin-bottom: 1em;
    }
    form label {
      float: left;
      margin-right: 0.5em;
    }
    button {
      background-color: var(--button-bg-color);
      color: var(--button-text-color);
    }
    `;
  }

  static get observedAttributes() {
    return ['username'];
  }

  static get properties() {
    return {
      username: {
        value: ''
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.dispatchEvent('login', {username: this.username});
  }

  render() {
    return (
      div(h3('Enter your name'),
        form({'on-submit': event => this.onSubmit(event)},
              label({for: 'username'}, 'Name:'),
          input({name: 'username',
                type:'text',
                value: this.username,
                'on-input': event => this.username = event.target.value}),
          button({type:'submit', disabled:this.username.trim().length === 0}, 'Play!'))
      )
    )

  }
};

export const loginElement = TaDom.customElement('login-element', LoginElement);
