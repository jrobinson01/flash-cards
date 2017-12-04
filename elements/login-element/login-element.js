import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class LoginElement extends TaDom.TaDomElement {

  static get css() {
    // return link({rel:'stylesheet', href:'/elements/login-element/login-element.css'});
    return `
    :host {
      display: block;
      font-size: 2rem;
      padding: 2rem 0;
    }
    form input {
      display: block;
      margin: 2rem auto;
      background: none;
      font-size: 2rem;
      border: none;
      text-align: center;
      font-family: Quicksand, sans-serif;
      color: var(--black);
      border-bottom: 2px solid var(--black);
    }
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
