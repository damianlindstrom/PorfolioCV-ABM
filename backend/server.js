const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT_IMAGES || 3001;

// Configuración para producción
const isProduction = process.env.NODE_ENV === 'production';
const publicDir = path.join(__dirname, '../public'); // Ajuste para estructura actual

// Configura CORS para producción
app.use(cors({
  origin: isProduction 
    ? ['https://tu-frontend.onrender.com'] 
    : '*'
}));

// Configura Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.ensureDirSync(publicDir);
      cb(null, publicDir);
    },
    filename: (req, file, cb) => {
      cb(null, 'current.jpg');
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Endpoint para subir imágenes
app.post('/upload-profile-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }
    
    const imageUrl = isProduction
      ? `https://geni-entors-images.onrender.com/current.jpg`
      : `http://localhost:${PORT}/current.jpg`;

    res.json({ 
      imageUrl,
      imagePath: '/current.jpg'
    });

  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Servir archivos estáticos desde /public
app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Servidor de imágenes en http://localhost:${PORT}`);
});