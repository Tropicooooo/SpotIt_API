import vine from '@vinejs/vine';

const userSchema = vine.object({
    email: vine.string().email().trim(),
    firstname: vine.string().trim().maxLength(50),
    lastname: vine.string().trim().maxLength(50),
    password: vine.string().maxLength(50),
    birthdate: vine.date(),
    phone: vine.string().trim().fixedLength(10),
    cityLabel: vine.string().trim().maxLength(50),
    postalCode: vine.number().withoutDecimals().min(1000).max(9999),
    streetLabel: vine.string().trim().maxLength(100),
    streetNumber: vine.number().withoutDecimals().positive(),
    pointsNumber: vine.number().withoutDecimals().positive().optional()
});

export const user = vine.compile(userSchema);