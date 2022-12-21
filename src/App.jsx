import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["うううう"]);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    window.confirm("本当に削除しますか？");
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickChangeTodoStatus = (index, completed = true) => {
    let newCompleteTodos = [...completeTodos];
    let newIncompleteTodos = [...incompleteTodos];

    if (completed) {
      newCompleteTodos.splice(index, 1);
      newIncompleteTodos = [...newIncompleteTodos, completeTodos[index]];
    } else {
      newIncompleteTodos.splice(index, 1);
      newCompleteTodos = [...newCompleteTodos, incompleteTodos[index]];
    }

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd} disabled={todoText === ""}>
          追加
        </button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickChangeTodoStatus(index, false)}>
                  完了
                </button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickChangeTodoStatus(index)}>
                  戻す
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
