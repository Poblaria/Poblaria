import vine from "@vinejs/vine";

export const imageValidator = vine.compile(
    vine.object({
        image: vine.file({
            size: "5mb",
            extnames: ["jpg", "jpeg", "png", "webp"]
        })
    })
);
