export const manager = (req, res, next) => {   
    if(req?.session?.status === 'admin' || req?.session?.status === 'manager'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const user = (req, res, next) => {   
    if(req?.session?.status === 'user'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const employee = (req, res, next) => {   
    if(req?.session?.status === 'admin' || req?.session?.status === 'employee' || req?.session?.status === 'manager'){
        next();
    } else {
        res.sendStatus(403);
    }
}

export const admin = (req, res, next) => {   
    if(req?.session?.status === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
}

