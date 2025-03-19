import vine from "@vinejs/vine";

export const housingImageValidator = vine.compile(
    vine.object({
        image: vine.string()
    })
);
