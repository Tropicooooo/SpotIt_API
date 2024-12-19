import * as userValidator from './validator/user.js';
import * as voucherValidator from './validator/voucher.js';

export const userValidatorMiddleware = {
    user : async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
}

export const voucherValidatorMiddleware = {
    voucher: async (req, res, next) => {
        try {
            req.val = await voucherValidator.voucher.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
};

export const userVoucherValidatorMiddleware = {
    userVoucher: async (req, res, next) => {
        try {
            req.val = await userVoucherValidator.userVoucher.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
};

export const managerValidatorMiddleware = {
    user : async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body?.currentUser);
            next();
        } catch (e) {
            console.log(e);
            
            res.status(400).send(e);
        }
    },

    voucher: async (req, res, next) => {
        try {
            req.val = await voucherValidator.voucher.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    userVoucher: async (req, res, next) => {
        try {
            req.val = await userVoucherValidator.userVoucher.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
}