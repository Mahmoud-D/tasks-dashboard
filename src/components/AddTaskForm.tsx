import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Bounce, toast } from "react-toastify";
import { formSchema } from "@/Schema";
import { TCurrentTask, TTask } from "@/types";

type TProps = {
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  currentTask: TCurrentTask;
  setCurrentTask: React.Dispatch<React.SetStateAction<TCurrentTask>>;
  onClose: () => void;
};

const AddTaskForm = ({
  tasks,
  setTasks,
  currentTask,
  setCurrentTask,
  onClose,
}: TProps) => {
  const form = useForm<TTask>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "not-started",
    },
  });

  // Populate form for editing if currentTask is present
  useEffect(() => {
    if (currentTask) {
      // Reset form with currentTask data for editing
      form.reset({
        title: currentTask.title || "",
        description: currentTask.description || "",
        status: currentTask.status || "not-started",
      });
    } else {
      // Reset form to default values for adding new task
      form.reset({
        title: "",
        description: "",
        status: "not-started",
      });
    }
  }, [currentTask, form]);

  // Step 3: Handle form submission
  function onSubmit(values: TTask) {
    if (currentTask) {
      // Edit task logic
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id ? { ...task, ...values } : task
        )
      );
    } else {
      // Add task logic
      const newTask: TTask = { ...values, id: tasks.length + 1 };
      setTasks([...tasks, newTask]);
    }

    toast.success("Task Added", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    setCurrentTask(null); // Reset current task

    form.reset({
      title: "",
      description: "",
      status: "not-started",
    }); // Reset form

    onClose(); // Close modal
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Input placeholder="Task Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder=" Task Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="not-started"> Not Started </SelectItem>
                  <SelectItem value="in-progress"> In Progress </SelectItem>
                  <SelectItem value="finished"> Finished</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {currentTask ? "Update" : "Add"} Task
        </Button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
