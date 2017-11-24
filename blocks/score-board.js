export default function(state, attributes) {
  return div(attributes,
    h3('Your Score'),
    h5(`Score: ${state.score}`),
    h5(`Level: ${state.level}`))
};
