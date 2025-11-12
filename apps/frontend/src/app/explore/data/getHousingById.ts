import { HOUSES } from "@/app/explore/data/Data";

export function getHousingById(id: string) {
  console.log("Searching for ID:", id);
  return HOUSES.find(h => {
    console.log("Comparing with house ID:", h.id);
    return String(h.id) === String(id);
  }) ?? null;
}