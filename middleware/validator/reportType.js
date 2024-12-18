import vine from '@vinejs/vine'; 

const reportTypeSchema = vine.object({
    label: vine.string().trim().maxLength(50),
    description: vine.string().trim().maxLength(500),
    emergency_degree: vine.number().min(1).max(5)
});

export const reportType = vine.compile(reportTypeSchema);
