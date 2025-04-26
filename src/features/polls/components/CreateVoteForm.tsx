"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPoll } from "@/features/polls/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "作成中..." : "Create Vote"}
    </Button>
  );
}

export default function CreateVoteForm() {
  return (
    <form action={createPoll} className="space-y-6">
      <div>
        <label htmlFor="title" className="block font-medium text-gray-700 text-sm">
          Name
        </label>
        <Input type="text" id="title" name="title" required />
      </div>
      <SubmitButton />
    </form>
  );
}
