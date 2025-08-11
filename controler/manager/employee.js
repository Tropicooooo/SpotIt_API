import { pool } from '../../database/database.js';
import * as employeeModel from '../../model/employee.js';

export const getAllEmployees = async (req, res) => {
    try {     
        const employees = await employeeModel.getAllEmployees(pool, req.query);
        const total = await employeeModel.getTotalEmployees(pool);

        if (employees === null) {
            return res.status(404).json({ message: '[EMPLOYE] Résultat de la recherche : 0 trouvé(s).' });
        }   

        return res.send({ employees, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const getAllEmployeesByName = async (req, res) => {
    try {
        const employees = await employeeModel.getAllEmployeesByName(pool, req.query);

        if (!employees) {
            return res.status(404).json({ message: '[EMPLOYE] Résultat de la recherche : 0 trouvé(s).' });
        }
        
        return res.send(employees);
    }
    catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const getOneEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.getOneEmployee(pool, req.query);
        
        if (!employee) {
            return res.status(404).json({ message: '[EMPLOYE] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send(employee);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        await employeeModel.updateEmployee(pool, req.val, req.body?.emailUpdate);

        return res.status(201).json({ message: '[EMPLOYE] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        await employeeModel.deleteEmployee(pool, req.query);

        return res.status(201).json({ message: '[EMPLOYE] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}
