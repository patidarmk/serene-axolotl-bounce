import { TodoList } from "@/components/todo/TodoList";
import { MadeWithApplaa } from "@/components/made-with-applaa";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TodoList />
      <MadeWithApplaa />
    </div>
  );
};

export default Index;