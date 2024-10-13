import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Bounce, toast } from "react-toastify";
import logo from "/logo.png";

type TProps = {
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
};
const Login = ({ setIsLoggedIn }: TProps) => {
  // Zod schema for form validation
  const loginSchema = z.object({
    username: z.string().min(1, "Username or email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  // Type for form inputs inferred from the Zod schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);

    console.log("Login attempt:", values);

    // Simulate a login request (e.g., to an API)
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }, 1000);

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    // Reset the form
    form.reset();
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center">
          <img src={logo} alt="logo" className="mb-4 w-25 h-25" />
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Enter your username or email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
