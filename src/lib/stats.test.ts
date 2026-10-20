import { describe, it, expect } from "vitest";
import { computeStats } from "./stats";
import type { Entry } from "@/data/collection";

const e = (status: Entry["status"], genres: string[]): Entry => ({
  id: Math.random() + "",
  title: "t",
  creator: "c",
  type: "Novel",
  realm: "written",
  status,
  rating: 0,
  genres,
  synopsis: "",
  notes: "",
});

describe("computeStats", () => {
  const s = computeStats([
    e("Completed", ["Fantasy"]),
    e("Reading", ["Fantasy", "Drama"]),
    e("Watching", ["Drama"]),
    e("Plan to Read", ["Fantasy"]),
  ]);
  it("excludes plan-to-read from total", () => expect(s.total).toBe(3));
  it("counts completed", () => expect(s.completed).toBe(1));
  it("counts reading and watching as in progress", () => expect(s.inProgress).toBe(2));
  it("picks most common genre", () => expect(s.favoriteGenre).toBe("Fantasy"));
});
