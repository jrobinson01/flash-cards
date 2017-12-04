export default function(state, attributes) {
  return div(attributes,
    div(`Score: ${state.score}`),
    div(`Level: ${state.level}`))
};
