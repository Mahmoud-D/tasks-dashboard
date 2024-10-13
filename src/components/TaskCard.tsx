import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "./ui/button";

import { TTask } from "@/types";
import { cn } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";

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
    <Card className=" w-[300px] sm:w-[400px] ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between pb-2 border-b">
          <span className="">{task.title}</span>
          <span
            className={` w-fit rounded-md text-sm px-2 py-1 text-white font-semibold  ${cn(
              task.status === "in-progress" && "bg-blue-500 ",
              task.status === "finished" && "bg-green-500",
              task.status === "not-started" && "bg-orange-300 "
            )} `}
          >
            {task.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="truncate ">{task.description}</CardContent>
      <CardFooter className="flex items-center justify-between gap-4 ">
        <Button
          className="bg-[#006F9E] hover:bg-[#006F9E] "
          type="button"
          onClick={() => handleEdit(task)}
        >
          <FilePenLine size={16} />
        </Button>
        {/* AlertDialog Trigger and Content */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-500" type="button">
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=" w-[300px] sm:w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this task?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(task)}
                className="bg-red-500 hover:bg-red-500"
                type="button"
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
