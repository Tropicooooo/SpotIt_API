export const manager = (req, res, next) => {
    if(req?.session?.status === 'manager'){
        next();
    } else {
        res.sendStatus(403);
    }
};

export const user = (req, res, next) => {   
    if(req?.session?.status === 'user'){
        next();
    } else {
        res.sendStatus(403);
    }
}