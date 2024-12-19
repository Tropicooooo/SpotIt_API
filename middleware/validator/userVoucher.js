import vine from '@vinejs/vine';

const userVoucherSchema = vine.object({
  code: vine.number().positive().withoutDecimals(),
  claimDate: vine.date(),
  expirationDate: vine.date(),
  userEmail: vine.string().email().trim(),
  voucherLabel: vine.string().trim()
});

export const userVoucher = vine.compile(userVoucherSchema);