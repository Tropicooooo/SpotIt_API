import { pool } from '../../database/database.js';
import * as userModel from '../../model/user.js';

export const getAllUsers = async (req, res) => {
    try {     
        const users = await userModel.getAllUsers(pool, req.query);
        const total = await userModel.getTotalUsers(pool);
        
        if (users === null) {
            return res.status(404).json({ message: '[USER] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send({ users, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const getAllUsersByName = async (req, res) => {
    try {
        const users = await userModel.getAllUsersByName(pool);
        
        if (!users) {
            return res.status(404).json({ message: '[USER] Résultat de la recherche : 0 trouvé(s).' });
        }
        
        return res.send(users);
    }
    catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const getOneUser = async (req, res) => {
    try {
        const user = await userModel.getOneUser(pool, req.query);

        if (!user) {
            return res.status(404).json({ message: '[USER] Résultat de la recherche : 0 trouvé(s).' });
        } 

        return res.send(user);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const createUser = async (req, res) => {
    try {       
        await userModel.createUser(pool, req.body);

        return res.status(201).json({ message: '[USER] Résultat de la création : Création réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.body);

        return res.status(201).json({ message: '[USER] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.query);

        return res.status(201).json({ message: '[USER] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}
