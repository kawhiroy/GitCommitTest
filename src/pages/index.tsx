"use client";
import { useState } from "react";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  //  Todoオブジェクトの型定義
  type Todo = {
    inputValue: string;
    index: number; //key指定のため
    inputDate: string;
  };

  //  changeText関数
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value); //  event.target.valueで入力されたものを取り出しtextを変更
  };

  //  日付を取得するchangeDate関数
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value); //  event.target.valueで入力されたものを取り出しdateを変更
  };

  //  todoを追加
  const addTodos = () => {
    //  新しいTodo作成
    const newTodo: Todo = {
      inputValue: text,
      index: todos.length,
      inputDate: date,
    };

    setTodos([newTodo, ...todos]);
    setText("");
    setDate("");
  };

  //  Todoの編集
  const editTodo = (index: number, inputValue: string) => {
    //  todosオブジェクトの中身を書き換えないようにmap()を使ってディープコピー
    const copyTodo = todos.map((todo) => ({ ...todo }));
    console.log(copyTodo);

    const newTodos = copyTodo.map((todo) => {
      if (todo.index === index) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //  期日の編集
  const editDate = (index: number, inputDate: string) => {
    //
    const copyDate = todos.map((todo) => ({ ...todo }));
    console.log(copyDate);

    const newDate = copyDate.map((todo) => {
      if (todo.index === index) {
        todo.inputDate = inputDate;
      }
      return todo;
    });

    setTodos(newDate);
  };

  //  todoを削除
  const deleteTodo = (index: number) => {
    //indexが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.index !== index);
    setTodos(newTodos);
  };

  //  今日の日付を取得
  const nowDate = new Date();
  const nowDateString =
    nowDate.getFullYear() +
    "-" +
    ("0" + (nowDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + nowDate.getDate()).slice(-2);

  return (
    <div className="index">
      <main>
        <h1>Todo</h1>
        <div>
          <input
            className="inputText"
            type="text"
            value={text}
            onChange={changeText}
          />
          <input
            className="inputText"
            type="date"
            min={nowDateString}
            value={date}
            onChange={changeDate}
          />
          <button
            className="submitButton"
            onClick={() => {
              if (text == "") {
                alert("Todoを入力してください");
              } else if (date == "") {
                alert("期日を選択してください");
              } else {
                addTodos();
              }
            }}
          >
            追加
          </button>
        </div>

        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.index}>
                <input
                  type="text"
                  value={todo.inputValue}
                  onChange={(event) => editTodo(todo.index, event.target.value)}
                />
                <input
                  type="date"
                  min={nowDateString}
                  value={todo.inputDate}
                  onChange={(event) => editDate(todo.index, event.target.value)}
                />

                <button
                  onClick={() => {
                    deleteTodo(todo.index);
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
