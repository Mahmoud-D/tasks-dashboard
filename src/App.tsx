import { useState } from "react";

import AddTaskDialog from "./components/AddTaskDialog";
import { Button } from "./components/ui/button";

import { TCurrentTask, TTask } from "./types";

import "./App.css";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [currentTask, setCurrentTask] = useState<TCurrentTask>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleEdit = (task: TTask) => {
  //   setCurrentTask(task);
  // };

  // const handleDelete = (task: TTask) => {
  //   const { id } = task;
  //   const filterTask = id ? tasks.filter((task) => task.id !== id) : tasks;
  //   setTasks(filterTask);
  // };

  const handleEdit = (task: TTask) => {
    setCurrentTask(task);
    setIsDialogOpen(true); // Open modal for editing
  };

  const handleAddNewTask = () => {
    setCurrentTask(null); // Set to null for adding a new task
    setIsDialogOpen(true); // Open modal for adding a task
  };

  const handleDelete = (task: TTask) => {
    const { id } = task;
    setTasks(tasks.filter((t) => t.id !== id)); // Filter out the task
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false); // Close the modal
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-8 text-3xl font-bold text-center">Task Management</h1>

      <Button type="button" onClick={handleAddNewTask}>
        Add New Task
      </Button>

      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        {tasks.map((task) => (
          // <div key={task.id}>
          //   <span>
          //     {task.title} - {task.status} - {task.description}
          //   </span>
          //   <Button type="button" onClick={() => handleEdit(task)}>
          //     Edit
          //   </Button>
          //   <Button type="button" onClick={() => handleDelete(task)}>
          //     Delete
          //   </Button>
          // </div>
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add/Edit Task Dialog */}
      {isDialogOpen && (
        <AddTaskDialog
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          onClose={handleCloseModal} // Close modal callback
        />
      )}
    </div>
  );
}

export default App;
