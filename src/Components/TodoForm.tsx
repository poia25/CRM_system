import React,{useState} from 'react'

interface AddTodoProps {
    addTodo: (text:string) => void
}

const TodoForm: React.FC<AddTodoProps> = ({addTodo}) => {

    const [text, setText] = useState("");
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(text.trim()) {
            addTodo(text);
            setText('')
        }
      };
  return (
    <>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form> 
    </>
  )
}

export default TodoForm