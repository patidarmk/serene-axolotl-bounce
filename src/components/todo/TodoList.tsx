import { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoStats } from "./TodoStats";
import { TodoFilter } from "./TodoFilter";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "active" | "completed";

export const TodoList = () => {;
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
    return [];
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([...todos, newTodo]);
    toast({
      title: "Task added",
      description: `"${text}" has been added to your list.`,
    });
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    if (todo) {
      toast({
        title: "Task deleted",
        description: `"${todo.text}" has been removed.`,
        variant: "destructive",
      });
    }
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    toast({
      title: "Task updated",
      description: "Your task has been updated.",
    });
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Todo List</h1>
      
      <TodoForm onAdd={addTodo} />
      
      <TodoStats total={todos.length} completed={completedCount} />
      
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {filter === "all" && "No tasks yet. Add one above!"}
          {filter === "active" && "No active tasks. Great job!"}
          {filter === "completed" && "No completed tasks yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}