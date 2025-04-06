const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const PORT = process.env.PORT_API || 3000;

// Configuración CORS
app.use(cors());

// Ruta ABSOLUTA a db.json
const dbPath = path.join(__dirname, 'db.json');

// Crear servidor JSON
const jsonApp = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Configurar middlewares
jsonApp.use(middlewares);
jsonApp.use(router);

// Montar json-server en /api
app.use('/api', jsonApp);

// Endpoint de verificación
app.get('/', (req, res) => {
  res.json({
    status: 'API funcionando',
    dbLocation: dbPath,
    endpoints: [
      '/api/educacion',
      '/api/perfil/1',
      '/api/lenguajes'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor API en http://localhost:${PORT}`);
  console.log(`📂 db.json ubicado en: ${dbPath}`);
  console.log('📌 Endpoints disponibles:');
  console.log(`   - http://localhost:${PORT}/api/educacion`);
  console.log(`   - http://localhost:${PORT}/api/perfil/1`);
});