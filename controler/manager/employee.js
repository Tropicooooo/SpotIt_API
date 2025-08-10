import {pool} from '../../database/database.js';
import * as employeModel from '../../model/employee.js';

// Gestion 
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