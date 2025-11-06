import { tuyau } from "@lib/tuyau";
import { InferResponseType } from "@tuyau/client";

export default async function uploadHousingImage(id: string, image: string) {
    const { data, error } = await tuyau["housing-images"]({ id }).$put({
        image
    });
    return { data, error: error?.value };
}

export type HousingImageResponse = InferResponseType<
    ReturnType<(typeof tuyau)["housing-images"]>["$put"]
>;
