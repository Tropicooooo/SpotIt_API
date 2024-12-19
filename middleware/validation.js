import * as userValidator from './validator/user.js';

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
    }
}