const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();
app.use('/profile', express.static(path.join(__dirname, 'public/profile')));
app.use(cors())

// Configura Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, 'public/profile');
      fs.ensureDirSync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, 'current.jpg'); // Sobrescribe la misma imagen
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Endpoint para subir imágenes
app.post('/upload-profile-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }
    
    // Devuelve la URL completa
    res.json({ 
      imageUrl: `http://localhost:3001/profile/current.jpg`,
      imagePath: '/profile/current.jpg' // Ruta relativa para la base de datos
    });

  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Servir archivos estáticos
app.use(express.static('public'));

app.listen(3001, () => {
  console.log('Servidor de imágenes en http://localhost:3001');
});