import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";

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

const AddTaskForm = () => {
  // Step 4: Manage state for tasks and the current task being edited
  const [tasks, setTasks] = useState<z.infer<typeof formSchema>[]>([]);
  const [currentTask, setCurrentTask] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  // Step 1: Define the form schema using zod
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    status: z.string(),
    id: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "not-started",
    },
  });
  useEffect(() => {
    console.log("first log", tasks);
  }, [tasks]); // Log tasks whenever it changes

  // Step 3: Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    //   function onSubmit(values: Omit<z.infer<typeof formSchema>, "id">) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const id: number = tasks.length ? tasks.length + 1 : 1;

    if (currentTask) {
      // Step 6: Update existing task
      setTasks(
        tasks.map((task) => (task.title === currentTask.title ? values : task))
      );
    } else {
      // Step 5: Add new task
      setTasks((tasks) => [...tasks, { ...values, id }]);
    }
    console.log(tasks);
    setCurrentTask(null); // Reset current task
    form.reset({
      title: "",
      description: "",
      status: "not-started",
    }); // Reset form
  }

  // Step 7: Populate form for editing
  const handleEdit = (task: z.infer<typeof formSchema>) => {
    setCurrentTask(task);
    form.reset(task);
  };
  // Step 8: Delete task from list
  const handleDelete = (task: z.infer<typeof formSchema>) => {
    const { id } = task;
    const filterTask = id ? tasks.filter((task) => task.id !== id) : tasks;
    setTasks(filterTask);
  };

  // Step 9: Render the form
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
        {/* <div className="flex justify-between"> */}
        {/* <Button type="button">Cancel</Button> */}
        {/* Default submit button */}
        {/* <Button type="submit">OK</Button> */}
        <Button type="button" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button type="submit">{currentTask ? "Update" : "Add"} Task</Button>
        {/* </div> */}
      </form>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <span>
              {task.title} - {task.status} - {task.id} - {task.description}
            </span>
            <Button type="button" onClick={() => handleEdit(task)}>
              Edit
            </Button>
            <Button type="button" onClick={() => handleDelete(task)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default AddTaskForm;
