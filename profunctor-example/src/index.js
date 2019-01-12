import React from "react";
import useProfunctorState from "@staltz/use-profunctor-state";
import generate from "string-to-color";
import ReactDOM from "react-dom";

function randomColor(name) {
  const ix = Math.random();
  const rand = Math.floor(((ix + 1) * 1000) % 16777215).toString(16);
  return generate(`${name} ${rand}`);
}

const ProInput = React.memo(({ state, setState }) => {
  return (
    <input
      type="text"
      value={state}
      style={{ backgroundColor: randomColor("light pink") }}
      onChange={ev => {
        ev.persist();
        setState(ev.target.value);
      }}
    />
  );
});

const Item = React.memo(({ state, setState }) => {
  const onChange = ev => {
    ev.persist();
    setState(ev.target.value);
  };
  return (
    <input
      style={{ backgroundColor: randomColor("green"), display: "block" }}
      type="text"
      value={state}
      onChange={onChange}
    />
  );
});

const List = React.memo(({ state, promap }) => {
  const list = state;
  const itemProf = i =>
    promap(
      list => list[i],

      (x, list) => {
        return list.map((y, j) => (j === i ? x : y));
      }
    );

  return (
    <ul style={{ backgroundColor: randomColor("light red") }}>
      {list.map((x, i) => (
        <Item key={i} {...itemProf(i)} />
      ))}
    </ul>
  );
});

function App() {
  const initialState = { list: [], todo: "" };
  // const profunctor = useProfunctorState(initialState);
  const { state, setState, promap } = useProfunctorState(initialState);

  const inputProf = promap(
    state => state.todo,
    (newTodo, oldState) => ({ ...oldState, todo: newTodo })
  );

  const listProf = promap(
    state => state.list,
    (newList, oldState) => ({ ...oldState, list: newList })
  );

  const onClick = () => {
    setState(prev =>
      prev.todo.length > 0
        ? { ...prev, todo: "", list: prev.list.concat(prev.todo) }
        : prev
    );
  };

  return (
    <div style={{ backgroundColor: randomColor("cyan") }}>
      <div>Global app state: {JSON.stringify(state)}</div>
      <ProInput {...inputProf} />
      <button onClick={onClick}>Insert</button>
      <List {...listProf} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
