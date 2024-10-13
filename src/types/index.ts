import { z } from "zod";
import { formSchema } from "@/Schema";

export type TTask = z.infer<typeof formSchema>;
export type TCurrentTask = z.infer<typeof formSchema> | null;
