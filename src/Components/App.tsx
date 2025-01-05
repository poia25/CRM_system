import React, { useState, useEffect } from "react";
import { Todo } from '../types/todo.ts'
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import Tabs from "./Tabs.tsx";

function App() {
  const [data, setData] = useState<Todo[] | null>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>('all')
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://easydev.club/api/v1/todos");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const fullAPI = await response.json();
        setData(fullAPI.data);
        console.log(fullAPI.info)
      } catch {
        console.log("БЕДА");
      }
    };
    fetchData();
  }, []);
  
  const filteredTasks = data?.filter((task) => {
    if (activeTab === "completed") return task.isDone;
    if (activeTab === "pending") return !task.isDone;
    return true;
  });

  const countAll = data?.length;
  const countCompleted = data?.filter((task) => task.isDone).length;
  const countPending = data?.filter((task) => !task.isDone).length;

  function addTodo(text:string) {
    const newTodo: Todo = { 
        id: Math.random(),
        title: text,
        isDone: false,
        created: crypto.randomUUID()
    }
    if(data) {
      setData([...data, newTodo])
    }else{
      setData([newTodo])
    }
  }

  function deleteTodo(id:number) {
    if(data) {
      setData(data.filter(todo => todo.id !== id))
    }
  }

  const toggleTodo = (id: number) => {
    if(data) {
      setData(data.map(todo =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ));
    }
};

  const editTodo = (id: number, newTitle: string) => {
    if(data) {
      setData(
        data.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    }
};

  return <div className="App">

    <TodoForm addTodo={addTodo}/>
    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} counts={{all:countAll, completed:countCompleted, pending: countPending}} />
    <TodoList todos={filteredTasks} deleteTodo={deleteTodo}  toggleTodo={toggleTodo} editTodo={editTodo}/>
  </div>;
}

export default App;
