import type { Entry } from "@/data/collection";

export function computeStats(list: Entry[]) {
  const counts: Record<string, number> = {};
  list.forEach((e) => e.genres.forEach((g) => (counts[g] = (counts[g] ?? 0) + 1)));
  const favoriteGenre = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const rated = list.filter((e) => e.rating > 0);
  const avgRating = rated.length
    ? Number((rated.reduce((s, e) => s + e.rating, 0) / rated.length).toFixed(1))
    : 0;
  return {
    total: list.filter((e) => e.status !== "Plan to Read").length,
    completed: list.filter((e) => e.status === "Completed").length,
    inProgress: list.filter((e) => e.status === "Reading" || e.status === "Watching").length,
    favoriteGenre,
    avgRating,
  };
}
