"use server";

import { redirect } from "next/navigation";
import { pollsRepository } from "@/features/polls/polls.repository";

export async function createPoll(formData: FormData) {
  const title = formData.get("title");
  if (!title || typeof title !== "string" || title.trim() === "") {
    // TODO: エラーハンドリング（バリデーション）
    return;
  }
  const poll = await pollsRepository.create(title);
  // 作成後、編集ページへリダイレクト（仮: /votes/[id]/edit）
  redirect(`/votes/${poll.id}/edit`);
}
