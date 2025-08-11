import vine from '@vinejs/vine';

const employeeSchema = vine.object({
    email: vine.string().email().trim(),
    firstname: vine.string().trim().maxLength(50),
    lastname: vine.string().trim().maxLength(50),
    phone_number: vine.string().trim().fixedLength(10),
    cityLabel: vine.string().trim().maxLength(50),
    postalCode: vine.number().withoutDecimals().min(1000).max(9999),
    streetLabel: vine.string().trim().maxLength(100),
    streetNumber: vine.number().withoutDecimals().positive(),
});

export const employee = vine.compile(employeeSchema);
