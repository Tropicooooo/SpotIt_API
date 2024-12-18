import vine from '@vinejs/vine';

const allowedStatuses = ['En attente', 'En cours', 'Résolu'];

const reportSchema = vine.object({
    description: vine.string().trim().maxLength(500),
    address: vine.string().trim().maxLength(50),
    problemTypeLabel: vine.string().trim().maxLength(50),
    status: vine.string().trim(),
    report_date: vine.date(),
    solved_date: vine.date()
});

// Validation personnalisée pour `status`
export const report = vine.compile(reportSchema);

export const validateStatus = (status) => {
    if (!allowedStatuses.includes(status)) {
        throw new Error(`Status must be one of: ${allowedStatuses.join(', ')}`);
    }
};
