import vine from "@vinejs/vine";

// TODO: transform to real file upload
export const housingImageValidator = vine.compile(
    vine.object({
        image: vine
            .string()
            .regex(/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/)
            .maxLength(7_000_000)
    })
);
