import { describe, expect, it } from "vitest";
import { pollsRepository } from "./polls.repository";

// テスト用のユニークなタイトルを生成
const uniqueTitle = `test-poll-${Date.now()}`;

describe("pollsRepository", () => {
  it("create() should insert a poll and return the created poll", async () => {
    const poll = await pollsRepository.create(uniqueTitle);
    expect(poll).toBeDefined();
    expect(poll.title).toBe(uniqueTitle);
    expect(typeof poll.id).toBe("number");
  });
});
