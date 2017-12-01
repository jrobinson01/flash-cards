import TaDom from '/node_modules/ta-dom-components/ta-dom-element.js';

export class GameElement extends TaDom.TaDomElement {

  static get css() {
    // nixed until this can get handled in ta-dom.
    // using a link results in the css file being reloaded everytime a new component is constructed.
    // return link({rel:'stylesheet', href:'/elements/game-element/game-element.css'});
    return `
    .problem {
      font-size: 32px;
      padding: 5px;
    }
    .answer-input {
      font-size: 32px;
      color: white;
      display: inline;
      border: 0;
      outline: 0;
      background: transparent;
      border-bottom: 2px solid white;
      width: 100px;
    }
    .answer-input[wrong-answer] {
      color: red;
    }`;
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
      },
      counter: {
        value: 10,
      },
      wrongAnswer: {
        value: false
      },
      disabled: {
        value: false
      }
    }
  }

  randomFactor() {
    return Math.round(Math.random() * 11);
  }

  connectedCallback() {
    super.connectedCallback();
    this.nextProblem();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('game disconnected');
    clearInterval(this.interval_);
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
    this.setState({
      problem: this.calcProblem(),
      guess: '',
      counter: 10,
      wrongAnswer: false,
      disabled: false
    });
    // start a countdown..
    clearInterval(this.interval_);
    this.interval_ = setInterval(() => {
      if(this.counter === 0) {
        this.missedAnswer();
        clearInterval(this.interval_);
      } else {
        this.counter -= 1;
      }
    }, 1000);
  }

  missedAnswer() {
    // play a buzzer, show the correct answer, then start the next problem
    this.setState({disabled: true, wrongAnswer: true, guess: String(this.problem.answer)});
    setTimeout(() => {
      this.nextProblem();
    }, 3000);
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

  maybeBuzzer(wrongAnswer) {
    if (wrongAnswer) {
      return audio({autoplay:'true'}, source({src:'/error.wav'}));
    }
  }

  // returns the dom for the "problem" display
  // ex: 2 x 2 = ____
  problemElements(problem) {
    return problem.factors.map((p,i) => span(p, i + 1 === problem.factors.length ? ' = ' : ' x '));
  }

  render() {
    return (
      div(
        h3('countdown: ', this.counter),
        this.maybeBuzzer(this.wrongAnswer),
        form({class:'problem', 'on-submit':event => this.testAnswer(event)},
          this.problemElements(this.problem),
          input({
            type: 'number',
            class: 'answer-input',
            'wrong-answer': this.wrongAnswer,
            value: this.guess,
            disabled:this.disabled,
            'on-input': event => this.guess = event.target.value
          }))
      )
    )
  }
};

export const gameElement = TaDom.customElement('game-element', GameElement);
