export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelet } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {
          //map関数で配列を繰り返して返却//
          todos.map((todo, index) => (
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
    </div>
  );
};
