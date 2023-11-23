import { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

//CSSのクラスを指定する際は、classNameを利用する
//classを利用するとclass構文となる。
export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //テキストボックスで入力された値をテキストボックスにセットする。
  //フォームライブラリがあるのでそれを利用することが多い
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加ボタンを押したときの処理
  const onClickAdd = () => {
    //未入力の場合は何もしない。
    if (todoText === "") return;

    //スプレッド構文でincompleteTodosをコピーして、newTodosに設定
    //todoTextを配列の最後に追加
    const newTodos = [...incompleteTodos, todoText];
    //新しい配列で画面を再描画
    setIncompleteTodos(newTodos);

    //テキストボックスの値をクリア
    setTodoText("");
  };

  //削除ボタンを押したときの処理
  const onClickDelet = (index) => {
    //スプレッド構文でincompleteTodosをコピー
    const newTodos = [...incompleteTodos];

    //index番目の要素から1個（第2引数）を削除する。
    newTodos.splice(index, 1);

    //新しい配列で画面を再描画
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押したときの処理
  const onClickComplete = (index) => {
    //スプレッド構文でincompleteTodosをコピー
    const newIncompleteTodos = [...incompleteTodos];
    //index番目の要素から1個（第2引数）を削除する。
    newIncompleteTodos.splice(index, 1);

    //スプレッド構文でcompleteTodosをコピー
    //完了ボタンが押されたTodoの内容をセット
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    //新しい配列で画面を再描画
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタンを押下した時の処理
  const onClickBack = (index) => {
    //スプレッド構文でcompleteTodosをコピー
    const newCompleteTodos = [...completeTodos];
    //index番目の要素から1個（第2引数）を削除する。
    newCompleteTodos.splice(index, 1);

    //スプレッド構文でincompleteTodosをコピー
    //完了ボタンが押されたTodoの内容をセット
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    //新しい配列で画面を再描画
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const isMaxIncompleteTodos = incompleteTodos.length >= 5;
  return (
    <>
      {/* <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div> */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxIncompleteTodos}
      />
      {/* <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {
            //map関数で配列を繰り返して返却//
            incompleteTodos.map((todo, index) => (
              //key（一意になる値）を必ずつける必要がある。
              //mapの第二引数のindexを利用すると順番が変わったときに対応できないので
              //IDなどを指定するとよい

              //JavaScriptのように引数を記載した関数だとループ中に実行される。
              //引数がある場合は、アロー関数内に関数を定義する。
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelet(index)}>削除</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div> */}
      {isMaxIncompleteTodos && (
        <p style={{ color: "red" }}>登録できるTODOは５個まで</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelet={onClickDelet}
      />
      {/* <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {
            //map関数で配列を繰り返して返却//
            completeTodos.map((todo, index) => (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div> */}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
