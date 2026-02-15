import vine from "@vinejs/vine";

export const getStatisticsValidator = vine.compile(
    vine.object({
        from: vine.date({ formats: ["YYYY-MM-DD"] }).optional(),
        to: vine
            .date({ formats: ["YYYY-MM-DD"] })
            .afterOrSameAs("from")
            .optional()
    })
);
