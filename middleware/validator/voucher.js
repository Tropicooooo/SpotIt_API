import vine from '@vinejs/vine';

const voucherSchema = vine.object({
    label: vine.string().trim(),
    description: vine.string().trim().maxLength(200),
    pointsNumber: vine.number().withoutDecimals().positive(),
    picture: vine.string().trim().maxLength(200)
});

export const voucher = vine.compile(voucherSchema);