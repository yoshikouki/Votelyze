"use server";

import { redirect } from "next/navigation";
import { pollsRepository } from "@/features/polls/polls.repository";
import { validatePoll } from "./validation";

export async function createPoll(formData: FormData) {
  const title = formData.get("title");
  const { result, error } = validatePoll({ title });
  if (error) {
    // TODO: エラーハンドリング（バリデーション）
    return { error };
  }
  const poll = await pollsRepository.create({ title: result.title });
  // 作成後、編集ページへリダイレクト（仮: /votes/[id]/edit）
  redirect(`/votes/${poll.id}/edit`);
}
