export const manager = (req, res, next) => {   
    if(req?.session?.status === 'Admin' || req?.session?.status === 'Manager'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const user = (req, res, next) => {   
    if(req?.session?.status === 'User'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const employee = (req, res, next) => {   
    if(req?.session?.status === 'Admin' || req?.session?.status === 'Employee' || req?.session?.status === 'Manager'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const admin = (req, res, next) => {   
    if(req?.session?.status === 'Admin'){
        next();
    } else {
        res.sendStatus(403);
    }
}

