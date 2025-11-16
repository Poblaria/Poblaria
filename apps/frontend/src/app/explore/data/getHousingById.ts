import { HOUSES } from "@/app/explore/data/Data";

export function getHousingById(id: string) {
    return (
        HOUSES.find((h) => {
            return String(h.id) === String(id);
        }) ?? null
    );
}
