import vine from '@vinejs/vine';

const userVoucherSchema = vine.object({
  code: vine.number().positive().withoutDecimals(),
  claimDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  expirationDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  userEmail: vine.string().email().trim(),
  voucherLabel: vine.string().trim()
});

export const userVoucher = vine.compile(userVoucherSchema);