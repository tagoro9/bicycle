import xs from "xstream";
import { run } from "@cycle/run";
import { div, button, p, makeDOMDriver } from "@cycle/dom";
import R from "ramda";

function main(sources) {
  const action$ = xs.merge(
    sources.DOM.select(".decrement").events("click").map(R.always(-1)),
    sources.DOM.select(".increment").events("click").map(R.always(1))
  );

  const count$ = action$.fold(R.add, 0);

  const vdom$ = count$.map(count =>
    div([
      button(".decrement", "Decrement"),
      button(".increment", "Increment"),
      p(`Counter: ${count}`)
    ])
  );

  return {
    DOM: vdom$
  };
}

run(main, {
  DOM: makeDOMDriver("#appContainer")
});
