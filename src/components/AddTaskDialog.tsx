import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddTaskForm from "./AddTaskForm";
import { TCurrentTask, TTask } from "@/types";

type TProps = {
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  currentTask: TCurrentTask;
  setCurrentTask: React.Dispatch<React.SetStateAction<TCurrentTask>>;
  onClose: () => void; // Close modal callback
};

const AddTaskDialog = ({
  tasks,
  setTasks,
  currentTask,
  setCurrentTask,
  onClose,
}: TProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xs rounded-lg sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center ">
            Add Task
          </DialogTitle>
        </DialogHeader>
        <AddTaskForm
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          onClose={onClose} // Close modal after form submit
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
