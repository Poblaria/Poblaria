import { HOUSES } from "@/app/explore/data/Data";

export function getHousingById(id: string) {
    return HOUSES.find((h) => h.id === id);
}
