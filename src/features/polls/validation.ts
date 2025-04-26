import { createInsertSchema } from "drizzle-zod";
import { ZodError } from "zod";
import { polls } from "@/lib/db/schema";

export const PollInsertSchema = createInsertSchema(polls);

export function validatePoll(input: unknown) {
  try {
    const result = PollInsertSchema.parse(input);
    return { result, error: null };
  } catch (e) {
    if (e instanceof ZodError) {
      return { result: null, error: e.errors };
    }
    throw e;
  }
}
