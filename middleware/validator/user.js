import vine from '@vinejs/vine';

const userSchema = vine.object({
    email: vine.string().email().trim(),
    firstname: vine.string().trim().maxLength(100),
    lastname: vine.string().trim().maxLength(100),
    password: vine.string().maxLength(100),
    birthdate: vine.date(),
    phone: vine.string().trim().fixedLength(10),
    cityLabel: vine.string().trim().maxLength(100),
    postalCode: vine.number().withoutDecimals().min(1000).max(9999),
    streetLabel: vine.string().trim().maxLength(100),
    streetNumber: vine.number().withoutDecimals().positive(),
    pointsNumber: vine.number().withoutDecimals().positive().optional()
});

export const user = vine.compile(userSchema);