import { db } from "@/lib/db";
import { polls } from "@/lib/db/schema";

export const pollsRepository = {
  async create({ title }: { title: string }) {
    const [poll] = await db.insert(polls).values({ title }).returning();
    return poll;
  },
  // 今後: find, update, delete などもここに集約
};
