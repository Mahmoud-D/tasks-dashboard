import { useEffect, useState } from "react";

import AddTaskDialog from "./AddTaskDialog";
import SortTasks from "./SortTasks";
import TasksList from "./TasksList";
import Pagination from "./Pagination";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TCurrentTask, TTask } from "../types/index";
import { LogOut } from "lucide-react";

type TProps = {
  handleLogout: () => void;
};
const TaskDashboard = ({ handleLogout }: TProps) => {
  // Tasks state
  const [tasks, setTasks] = useState<TTask[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Add task state
  const [currentTask, setCurrentTask] = useState<TCurrentTask>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sorting,
  const [sortField, setSortField] = useState<keyof TTask>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  //filtering,
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // and pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4; // Number of tasks per page

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSort = (field: keyof TTask) => {
    setSortField(field);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  // Filtering logic
  const filteredTasks = sortedTasks.filter((task) =>
    filterStatus === "all" ? true : task.status === filterStatus
  );

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

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
    toast.error("Task Deleted", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false); // Close the modal
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <ToastContainer />

      <Button className="absolute top-4 right-2" onClick={handleLogout}>
        <LogOut size={16} strokeWidth={1.25} />{" "}
      </Button>

      <h1 className="my-8 text-3xl font-bold text-center">Task Management</h1>

      <Button
        className="bg-[#006F9E] hover:bg-[#006F9E] px-10 font-semibold "
        type="button"
        onClick={handleAddNewTask}
      >
        Add New Task
      </Button>

      {/* Sorting and Filtering Controls */}
      <div className="flex flex-col items-center justify-center gap-2 mt-4 md:flex-wrap md:flex-row">
        <SortTasks
          sortField={sortField}
          sortDirection={sortDirection}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          handleSort={handleSort}
          setSortDirection={setSortDirection}
          setSortField={setSortField}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-500" type="button">
              Clear All Tasks
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className=" w-[300px] sm:w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete All tasks?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                tasks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={() => {
                  localStorage.removeItem("tasks");
                  setTasks([]);
                }}
                className="bg-red-500 hover:bg-red-500"
                type="button"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Task List */}
      <TasksList
        tasks={currentTasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Add/Edit Task Dialog */}
      {isDialogOpen && (
        <AddTaskDialog
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          onClose={handleCloseModal}
        />
      )}

      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
