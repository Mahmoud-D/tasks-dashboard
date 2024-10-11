import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TTask } from "@/types";
import { Button } from "./ui/button";

type TProps = {
  task: TTask;
  onEdit: (task: TTask) => void;
  onDelete: (task: TTask) => void;
};
const TaskCard = ({
  task,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: TProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>

        <CardDescription>{task.status}</CardDescription>
      </CardHeader>
      <CardContent>{task.description}</CardContent>
      <CardFooter>
        <Button type="button" onClick={() => handleEdit(task)}>
          Edit
        </Button>
        <Button type="button" onClick={() => handleDelete(task)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
