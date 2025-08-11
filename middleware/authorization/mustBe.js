export const manager = (req, res, next) => {   
    if(req?.session?.status === 'Admin' || req?.session?.status === 'Manager'){
        next();
    } else {
        return res.status(403).json({ message: 'Erreur des autorisations.' });
    }
}

export const user = (req, res, next) => {   
    if(req?.session?.status === 'User' || req?.session?.status === 'Admin' || req?.session?.status === 'Manager' || req?.session?.status === 'Employee'){
        next();
    } else {
        return res.status(403).json({ message: 'Erreur des autorisations.' });
    }
}

export const employee = (req, res, next) => {   
    if(req?.session?.status === 'Admin' || req?.session?.status === 'Employee' || req?.session?.status === 'Manager'){
        next();
    } else {
        return res.status(403).json({ message: 'Erreur des autorisations.' });
    }
}

export const admin = (req, res, next) => {   
    if(req?.session?.status === 'Admin'){
        next();
    } else {
        return res.status(403).json({ message: 'Erreur des autorisations.' });
    }
}
