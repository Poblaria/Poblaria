"use server";
import { InferResponseType } from "@tuyau/client";
import { tuyau } from "@lib/tuyau";
import getHousingImage from "@actions/housings/images/getHousingImage";

export default async function getHousings(fetchImages = false) {
    const { data, error } = await tuyau.housings.$get();
    if (!fetchImages || error) return { data, error: error?.value };
    return {
        data: await Promise.all(
            data.map(async (housing) => {
                if (!housing.imageId) return housing;
                const { data: image } = await getHousingImage(
                    housing.imageId.toString()
                );
                if (!image) return housing;
                return {
                    ...housing,
                    image: `data:image/jpeg;base64,${image.image}`
                };
            })
        )
    };
}

export type HousingsResponse = (InferResponseType<
    typeof tuyau.housings.$get
>[number] & { image?: string })[];
