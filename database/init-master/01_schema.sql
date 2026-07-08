CREATE DATABASE IF NOT EXISTS app_tareas_db;
USE app_tareas_db;

-- 1. Tabla Estudiantes
CREATE TABLE Estudiantes (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    correo_institucional VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Tabla Tareas
CREATE TABLE Tareas (
    codigo_tarea VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_limite DATETIME NOT NULL
);

-- 3. Tabla Entregas
CREATE TABLE Entregas (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    codigo_tarea VARCHAR(50) NOT NULL,
    respuesta_texto TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Claves Foráneas para relacionar las tablas
    CONSTRAINT fk_estudiante 
        FOREIGN KEY (id_estudiante) 
        REFERENCES Estudiantes(id_estudiante) 
        ON DELETE CASCADE,
        
    CONSTRAINT fk_tarea 
        FOREIGN KEY (codigo_tarea) 
        REFERENCES Tareas(codigo_tarea) 
        ON DELETE CASCADE,
        
    -- Restricción de negocio: Intento único
    CONSTRAINT intento_unico 
        UNIQUE (id_estudiante, codigo_tarea)
);

-- DATOS PRUEBA

INSERT INTO Estudiantes (correo_institucional, nombre, password_hash) VALUES
('ariel.macias@epn.edu.ec', 'Ariel Macias', '123456'),
('ardanny.romero@epn.edu.ec', 'Ardanny Romero', '000000'),
('brandon.huera@epn.edu.ec', 'Brandon Huera', '123456');

INSERT INTO Tareas (codigo_tarea, titulo, descripcion, fecha_limite) VALUES
('AD-001', 'Ensayo sobre Docker', 'Redactar un resumen de la arquitectura de contenedores.', '2026-07-20 23:59:00'),
('AD-002', 'Script de Replicacion', 'Subir los comandos utilizados para configurar Master-Slave.', '2026-07-15 18:00:00'),
('AD-003', 'Tarea Vencida - Prueba', 'Esta tarea sirve para probar el bloqueo de sistema.', '2026-06-01 10:00:00');