import multer from 'multer';
import fs from 'fs';

// Fonction pour créer des dossiers si nécessaire
const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Fonction pour configurer Multer avec un dossier cible
export const configureUpload = (folder) => {
  createFolder(folder);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Limite de taille de fichier à 10 Mo
};