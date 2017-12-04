// import TaDom
import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

// import elements used
import {loginElement} from '/elements/login-element/login-element.js';
import {mainControls} from '/elements/main-controls/main-controls.js';
import {gameElement} from '/elements/game-element/game-element.js';

// import blocks
import scoreBoard from '/blocks/score-board.js';

// import utilities
import db from '/util/db.js';

export class FlashCardsApp extends TaDom.TaDomElement {

  static get css() {
    return `
      :host {
        border-top: solid 1rem var(--blue);
        display: block;
        padding: 10px;
        max-width: 400px;
        background: var(--white);
        border-radius: 4px;
        margin: 2rem auto;
        box-shadow: var(--box-shadow);
        text-align: center;
        padding-bottom: 4rem;
      }

      .loading {
        color: #CCCCCC;
      }
      .score-board {
        display: flex;
        justify-content: space-around;
        font-size: 1.5rem;
        margin: 2rem;
      }
    `
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
        value: ''
      },
      isLoading: {
        value: false
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: get user out of db
    this.isLoading = true;
    db.get('user').then(data => {
      console.log('got a user:', data);
      this.isLoading = false;
      this.currentView = FlashCardsApp.viewState.LOGIN;
    }).catch((err)=> {
      this.isLoading = false;
      console.log('no user found!');
      this.currentView = FlashCardsApp.viewState.LOGIN;
    });
  }

  onLogin(username) {
    this.setState({
      currentView: FlashCardsApp.viewState.GAME,
      username
    });
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
    if (this.score % 10 === 0) {
      this.level += 1;
    }
  }

  onIncorrectAnswer(event) {
    // do something...
  }

  maybeLoginView(currentView, {username}) {
    if (currentView === FlashCardsApp.viewState.LOGIN) {
      return loginElement(
        {username: username,
        'on-login': event => this.onLogin(event.detail.username)
      });
    }
  }

  maybeGameView(currentView, {level, score}) {
    if (currentView === FlashCardsApp.viewState.GAME) {
      return div(
        gameElement({
        'level': level,
        'on-correct-answer': event => this.onCorrectAnswer(event),
        'on-incorrect-answer': event => this.onIncorrectAnswer(event)}),
      scoreBoard({score: score, level: level}, {class:'score-board'}),
      mainControls({
        'on-quit':event => this.onQuit(),
        'on-reset':event => this.onReset()
      }));
    }
  }

  render() {
    if(this.isLoading) {
      return div({class:'loading'},'loading...');
    }
    return div(
      this.maybeLoginView(this.currentView, this.state_),
      this.maybeGameView(this.currentView, this.state_)
    )
  }
};
// enum for view state
FlashCardsApp.viewState = {
  LOGIN: 'login',
  GAME: 'game'
};

export const flashCardsApp = TaDom.customElement('flash-cards-app', FlashCardsApp);
