import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class LoginElement extends TaDom.TaDomElement {

  static get css() {
    return link({rel:'stylesheet', href:'/elements/login-element/login-element.css'});
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
      div(h3('Login'),
        form({'on-submit': event => this.onSubmit(event)},
              label({for: 'username'}, 'username:'),
          input({name: 'username',
                type:'text',
                value: this.username,
                'on-input': event => this.username = event.target.value}),
          button({type:'submit', disabled:this.username.trim().length === 0}, 'login'))
      )
    )

  }
};

export const loginElement = TaDom.customElement('login-element', LoginElement);
