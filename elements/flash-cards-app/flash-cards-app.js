// import TaDom
import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

// import elements used
import {loginElement} from '/elements/login-element/login-element.js';
import {mainControls} from '/elements/main-controls/main-controls.js';
import {gameElement} from '/elements/game-element/game-element.js';
import {animatedElement} from '/elements/animated-element.js';

// import blocks
import scoreBoard from '/blocks/score-board.js';

// import utilities
import db from '/util/db.js';

export class FlashCardsApp extends TaDom.TaDomElement {

  static get css() {
    return link({rel:'stylesheet', href:"/elements/flash-cards-app/flash-cards-app.css"});
  }

  static get observedAttributes() {
    return [];
  }

  static get properties() {
    return {
      username: {
        value: ''
      },
      score: {
        value: 0
      },
      level: {
        value: 0
      },
      user: {
        value: {}
      },
      currentView: {
        value: FlashCardsApp.viewState.LOGIN
      }
    }
  }

  connectedCallback() {
    // attempt to get user out of db??
    // this.currentView = FlashCardsApp.viewState.LOGIN;
  }
  
  onLogin(username) {
    this.setState({
      currentView: FlashCardsApp.viewState.GAME,
      username
    });
    // start the game!
    this.shadowRoot.querySelector('game-element').nextProblem();
  }

  onQuit() {
    this.setState({
      currentView: FlashCardsApp.viewState.LOGIN,
      score: 0,
      level: 0,
      username: ''
    });

  }

  onReset() {
    this.onQuit();
    // reset score, etc.
  }

  onCorrectAnswer(event) {
    this.score += 1;
    if (this.score > 10) {
      this.level += 1;
    }
  }

  onIncorrectAnswer(event) {
    // do something...
  }

  render() {
    return (
      div(
        animatedElement({visible: this.currentView === 'login'},
          loginElement({username: this.username, 'on-login': event => this.onLogin(event.detail.username)})),
        animatedElement({visible: this.currentView === 'game'},
          gameElement({
            'level': this.level,
            'on-correct-answer': event => this.onCorrectAnswer(event),
            'on-incorrect-answer': event => this.onIncorrectAnswer(event)}),
          mainControls({
            'on-quit':event => this.onQuit(),
            'on-reset':event => this.onReset()
          }),
          scoreBoard({score: this.score, level: this.level}, {class:'score-board'})
        )
      )
    )
  }
};
// enum for view state
FlashCardsApp.viewState = {
  LOGIN: 'login',
  GAME: 'game'
};

export const flashCardsApp = TaDom.customElement('flash-cards-app', FlashCardsApp);
