import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "../../styles/todolists.scss";

const TodolistWrapper = (props) => {
  const { foo } = props;
  const [addTodoValue, setAddTodoValue] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const [filterCompletedTodo, setFilterCompletedTodo] = useState([]);
  const [filterNotCompletedTodo, setFilterNotCompletedTodo] = useState([]);
  const [addTodoLoading, setAddTodoLoading] = useState(false);

  useEffect(() => {
    setFilterCompletedTodo(foo.filter((x) => x.check === true));
    setFilterNotCompletedTodo(foo.filter((x) => x.check === false));
  }, [foo]);

  const addTodo = () => {
    setAddTodoLoading(true);
    setTimeout(() => {
      props.dispatch({
        type: "ADD",
        data: {
          name: addTodoValue,
          id: parseFloat(Math.random()),
          check: false,
        },
      });
      setAddTodoValue("");
      setAddTodoLoading(false);
    }, 3000);
  };

  const changeOnCeck = (index) => {
    const x = [...foo];
    let idx = x.findIndex((x) => x.id === index);
    if (idx !== -1) {
      x[idx]["check"] = !x[idx]["check"];
      props.dispatch({
        type: "UPDATE",
        data: [...x],
      });
    }
  };

  const clickOnDelete = (ind) => {
    const x = [...foo];
    let idx = x.findIndex((x) => x.id === ind);
    if (idx !== -1) {
      x.splice(idx, 1);
      props.dispatch({
        type: "DELETE",
        data: [...x],
      });
    }
  };

  const updateInputName = (name, ind, type) => {
    if (type === "filterNotCompletedTodo") {
      const data = [...filterNotCompletedTodo];
      let idx = data.findIndex((x) => x.id === ind);
      if (idx !== -1) {
        data[idx]["name"] = name;
        setFilterNotCompletedTodo([...data]);
      }
    } else {
      const data = [...filterCompletedTodo];
      let idx = data.findIndex((x) => x.id === ind);
      if (idx !== -1) {
        data[idx]["name"] = name;
        setFilterCompletedTodo([...data]);
      }
    }
  };

  const updateTodoDataWithRedux = () => {
    props.dispatch({
      type: "UPDATE",
      data: [...filterCompletedTodo, ...filterNotCompletedTodo],
    });
    setEditTodoId("");
  };

  return (
    <div className="container">
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input
          id="new-task"
          type="text"
          value={addTodoValue ? addTodoValue : ""}
          onChange={(e) => setAddTodoValue(e.target.value)}
        />
        <button onClick={addTodo}>
          {addTodoLoading ? "Loading..." : "Add"}
        </button>
      </p>

      <h3>Todo</h3>
      <ul id="incomplete-tasks">
        {filterNotCompletedTodo.map((todo) => (
          <li
            key={todo.id}
            className={parseFloat(editTodoId) === todo.id ? "editMode" : ""}
          >
            <input type="checkbox" onChange={() => changeOnCeck(todo.id)} />
            <label>{todo.name}</label>
            <input
              type="text"
              value={todo.name}
              onChange={(e) =>
                updateInputName(
                  e.target.value,
                  todo.id,
                  "filterNotCompletedTodo"
                )
              }
              onBlur={updateTodoDataWithRedux}
            />
            <button className="edit" onClick={() => setEditTodoId(todo.id)}>
              Edit
            </button>
            <button className="delete" onClick={() => clickOnDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Completed</h3>
      <ul id="completed-tasks">
        {filterCompletedTodo.map((todo) => (
          <li
            key={todo.id}
            className={parseInt(editTodoId) === todo.id ? "editMode" : ""}
          >
            <input
              type="checkbox"
              checked
              onChange={() => changeOnCeck(todo.id)}
            />
            <label>{todo.name}</label>
            <input
              type="text"
              value={todo.name}
              onBlur={updateTodoDataWithRedux}
              onChange={(e) =>
                updateInputName(e.target.value, todo.id, "filterCompletedTodo")
              }
            />
            <button className="edit" onClick={() => setEditTodoId(todo.id)}>
              Edit
            </button>
            <button className="delete" onClick={() => clickOnDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  foo: state.Todod.foo,
});

export default connect(mapStateToProps)(TodolistWrapper);
