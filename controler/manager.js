import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import * as employeModel from '../model/employee.js';
import * as reportModel from '../model/report.js';
import * as jobModel from '../model/job.js';
import * as reportTypeModel from '../model/reportType.js';

export const getUsers = async (req, res) => {
    try {     
        const users = await userModel.getUsers(pool, req.query);
        const total = await userModel.getTotalUsers(pool);
        if (users === null) {
            return res.sendStatus(404);
        }     
        return res.send({users,total});
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.getUser(pool, req.query);
        if (!user) {
            return res.sendStatus(404);
        } 
        return res.send(user);
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.query);
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}
export const createUser = async (req, res) => {
    try {        
        await userModel.createUser(pool, req.val, req.body?.emailUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const getEmployees = async (req, res) => {
    try {     
        const employees = await employeModel.getEmployees(pool, req.query);
        const total = await employeModel.getTotalEmployees(pool);
        if (employees === null) {
            return res.sendStatus(404);
        }     
        return res.send({employees,total});
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getEmployee = async (req, res) => {
    try {
        const employee = await employeModel.getEmployee(pool, req.query);
        if (!employee) {
            return res.sendStatus(404);
        } 
        return res.send(employee);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        await employeModel.deleteEmployee(pool, req.query);
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateEmployee = async (req, res) => {
    try {
        await employeModel.updateEmployee(pool, req.val, req.body?.emailUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}


export const getAllReports = async (req, res) => {
    try {     
        const reports = await reportModel.getAllReports(pool, req.query);
        const total = await reportModel.getTotalReports(pool);
        if (reports === null) {
            return res.sendStatus(404);
        }     
        return res.send({reports,total});
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getAllReport = async (req, res) => {
    try {
        const report = await reportModel.getAllReport(pool, req.query);
        if (!report) {
            return res.sendStatus(404);
        } 
        return res.send(report);
    } catch (e) {
        return res.sendStatus(500);
    }
}
export const updateReport = async (req, res) => {
     try {
        console.log("controler", req.body);
        await reportModel.updateReport(pool, req.body);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}


export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val, req.body?.emailUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};


export const createReport = async (req, res) => {
    try {
        console.log("create report", req.body);
        const {status, reportdate, address, user, solveddate, description, problemtypelabel, responsable} = req.body;

        const picture = req.file ? `/uploads/reports/${req.file.filename}` : null;

        await reportModel.addReport(pool, {
            status,
            reportdate,
            address,
            user,
            solveddate,
            description,
            problemtypelabel,
            picture,
            responsable
        });
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const getJobs = async (req, res) => {
    try {
        const jobs = await jobModel.getJobs(pool, req.query);
        const total = await jobModel.getTotalJobs(pool, req.query);
        if (jobs === null) {
            return res.sendStatus(404);
        }     
        return res.send({jobs,total});
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const getJob = async (req, res) => {
    try {
        console.log(req);
        const job = await jobModel.getJob(pool, req.query);
        if (!job) {
            return res.sendStatus(404);
        } 
        return res.send(job);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateJob = async (req, res) => {
    try {
        await jobModel.updateJob(pool, req.body);
        return res.sendStatus(204);
    } catch (err) {
        console.error("Erreur dans le contrôleur updateJob :", err);
        return res.sendStatus(500);
    }
};

export const deleteReport = async (req, res) => {
    console.log(req.query);

    try {
        await reportModel.deleteReport(pool, req.query);
        
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
    
};

export const getAllReportType = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getAllReportType(pool, req.query);
        if (!problemType) {
            return res.sendStatus(404);
        }
        return res.send(problemType);
    }
    catch (e) {
        return res.sendStatus(500);
    }
};

export const getReportType = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getReportType(pool, req.query);
        const total = await reportTypeModel.getTotalReportType(pool);
        if (!problemType) {
            return res.sendStatus(404);
        }
        return res.send({problemType,total});
    }
    catch (e) {
        return res.sendStatus(500);
    }
}

export const getEmployeesName = async (req, res) => {
    try {
        const employees = await employeModel.getEmployeesName(pool, req.query);
        if (!employees) {
            return res.sendStatus(404);
        }
        return res.send(employees);
    }
    catch (e) {
        return res.sendStatus(500);
    }
}

export const updateReportType = async (req, res) => {
    try {
        await reportTypeModel.updateReportType(pool, req.body?.currentReportType, req.body?.labelUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const createReportType = async (req, res) => {
    try {
        await reportTypeModel.createReportType(pool, req.body?.currentReportType);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const deleteReportType = async (req, res) => {
    try {
        await reportTypeModel.deleteReportType(pool, req.query);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}
