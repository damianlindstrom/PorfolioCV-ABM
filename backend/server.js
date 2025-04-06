const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT_IMAGES || 3001;

// Configuración para producción
const isProduction = process.env.NODE_ENV === 'production';

// Middleware CORS
app.use(cors({
  origin: isProduction ? '' : '*'
}));

// Configura Multer para guardar en /public/profile
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/profile');
      fs.ensureDirSync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, 'current.jpg'); // Siempre el mismo nombre
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
    
    const imageUrl = isProduction
      ? `https://tu-backend.onrender.com/profile/current.jpg`
      : `http://localhost:${PORT}/profile/current.jpg`;

    res.json({ 
      imageUrl,
      imagePath: '/profile/current.jpg' // Ruta relativa para la BD
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Servir archivos estáticos desde /public
app.use('/profile', express.static(path.join(__dirname, '../public/profile')));

app.listen(PORT, () => {
  console.log(`Servidor de imágenes en http://localhost:${PORT}`);
});