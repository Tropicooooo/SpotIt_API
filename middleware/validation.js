import * as userValidator from './validator/user.js';
import * as voucherValidator from './validator/voucher.js';
import * as EmployeeValidator from './validator/employee.js';
import * as ReportValidator from './validator/report.js';
import * as ReportTypeValidator from './validator/reportType.js';

export const userValidatorMiddleware = {
    user : async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    updateWithoutPassword : async (req, res, next) => {
        try {
            req.val = await userValidator.updateWithoutPassword.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e);
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
            req.val = await  userValidator.user.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e);
        }
    },
    
    updateWithoutPassword : async (req, res, next) => {
        try {
            req.val = await userValidator.updateWithoutPassword.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e);
        }
    },

    employee : async (req, res, next) => {
        try {
            req.val = await EmployeeValidator.employee.validate(req.body?.currentEmployee);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    report : async (req, res, next) => {
        try {
            req.val = await ReportValidator.report.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    reportType : async (req, res, next) => {
        try {
            req.val = await ReportTypeValidator.reportType.validate(req.body?.currentReportType);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
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