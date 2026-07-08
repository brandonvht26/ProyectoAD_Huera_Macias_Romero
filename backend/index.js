const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para aceptar peticiones del frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost'], // Permitir orígenes de Vite y Docker
  credentials: true
}));
app.use(express.json());

// Conexión a la base de datos Master (Puerto 3310)
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: 3310,
  user: 'root',
  password: 'rootpassword',
  database: 'app_tareas_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware para verificar token "mock" (para mantener compatibilidad con el frontend)
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autenticado.' });
  }
  const token = authHeader.split(' ')[1];
  const userId = token.replace('mock-jwt-', '');
  if (!userId) {
    return res.status(401).json({ message: 'No autenticado.' });
  }
  req.userId = parseInt(userId, 10);
  next();
};

// ==========================================
// RUTAS (ENDPOINTS)
// ==========================================

// 1. POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { correo_institucional, password } = req.body;
  if (!correo_institucional || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
  }
  try {
    // Comparamos el password con el hash_simulado (o la contraseña en BD)
    const [rows] = await pool.execute(
      'SELECT id_estudiante, correo_institucional, nombre FROM Estudiantes WHERE correo_institucional = ? AND password_hash = ?',
      [correo_institucional, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const user = rows[0];
    res.json({
      token: `mock-jwt-${user.id_estudiante}`,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// 2. GET /api/tareas
app.get('/api/tareas', requireAuth, async (req, res) => {
  try {
    const [tareas] = await pool.execute('SELECT * FROM Tareas');
    const [entregas] = await pool.execute(
      'SELECT codigo_tarea, respuesta_texto, fecha_envio FROM Entregas WHERE id_estudiante = ?',
      [req.userId]
    );

    // Formatear la respuesta para que coincida con lo que esperaba el frontend
    const result = tareas.map(tarea => {
      const entrega = entregas.find(e => e.codigo_tarea === tarea.codigo_tarea);
      if (entrega) {
        return { ...tarea, mi_entrega: entrega };
      }
      return tarea;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// 3. POST /api/entregas
app.post('/api/entregas', requireAuth, async (req, res) => {
  const { codigo_tarea, respuesta_texto } = req.body;
  if (!codigo_tarea || !respuesta_texto) {
    return res.status(400).json({ message: 'Faltan datos obligatorios.' });
  }

  try {
    // Validar si la tarea existe y su fecha límite
    const [tareas] = await pool.execute('SELECT fecha_limite FROM Tareas WHERE codigo_tarea = ?', [codigo_tarea]);
    if (tareas.length === 0) {
      return res.status(404).json({ message: 'La tarea no existe.' });
    }

    if (new Date() > new Date(tareas[0].fecha_limite)) {
      return res.status(400).json({ message: 'El plazo para entregar esta tarea ha finalizado.' });
    }

    // Insertar la entrega (La restricción UNIQUE en la BD prevendrá duplicados automáticamente)
    await pool.execute(
      'INSERT INTO Entregas (id_estudiante, codigo_tarea, respuesta_texto, fecha_envio) VALUES (?, ?, ?, NOW())',
      [req.userId, codigo_tarea, respuesta_texto]
    );

    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya has entregado esta tarea anteriormente.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
