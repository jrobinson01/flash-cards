import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

const pEls = (prob) => {
  // 4 x 3 x 2 =
  return prob.factors.map((p,i) => span(p, i + 1 === prob.factors.length ? ' = ' : ' x '));
};

export class GameElement extends TaDom.TaDomElement {

  static get css() {
    return link({rel:'stylesheet', href:'/elements/game-element/game-element.css'});
  }

  static get observedAttributes() {
    return ['level'];
  }

  static get properties() {
    return {
      problem: {
        value: {
          factors: [],
          answer: 0
        }
      },
      guess: {
        value: ''
      },
      level: {
        value: 0
      }
    }
  }

  randomFactor() {
    return Math.round(Math.random() * 10);
  }

  calcProblem() {
    // generate some random numbers
    const factors = [];
    // let x = parseInt(this.level, 10) + 2;
    let x = 2;
    while(x-- > 0) {
      factors.push(this.randomFactor())
    }
    const answer = factors.reduce((sum, n) => sum * n, 1);
    return {factors, answer};
  }

  nextProblem() {
    // batch state updates
    this.setState({problem: this.calcProblem(), guess: ''});
    // start a countdown..
    // this will be tricky because we're technically already
    // on the screen when the app starts (animated transition)
    // should the parent app call startGame or something when it's ready?
    // ...
  }

  testAnswer(event) {
    event.preventDefault();
    if (parseInt(this.guess, 10) === this.problem.answer) {
      // correct!
      // increment score (dispatch event)
      this.dispatchEvent('correct-answer');
      // create a new problem
      this.nextProblem();
    } else {
      // incorrect!
      this.dispatchEvent('incorrect-answer');
      this.guess = '';
    }
  }

  render() {
    return (
      div(
        h3('Game'),
        form({class:'problem', 'on-submit':event => this.testAnswer(event)},
          pEls(this.problem),
          input({
            type: 'number',
            class: 'answer-input',
            value: this.guess,
            'on-input': event => this.guess = event.target.value
          }))
      )
    )
  }
};

export const gameElement = TaDom.customElement('game-element', GameElement);
