import TaskCard from "./TaskCard";
import { TTask } from "@/types";

type TProps = {
  tasks: TTask[];
  handleEdit: (task: TTask) => void;
  handleDelete: (task: TTask) => void;
};
const TasksList = ({ tasks, handleEdit, handleDelete }: TProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TasksList;
