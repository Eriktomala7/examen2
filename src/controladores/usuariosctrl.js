import { conmysql } from "../db.js";
import bcrypt from "bcrypt";

// Login de usuario
export const loginUsuario = async (req, res) => {
    const { usuario, clave } = req.body;
    try {
      const [result] = await conmysql.query(`SELECT * FROM usuario WHERE usuario = ? AND clave = ?`, [usuario, clave]);
  
      if (result.length === 0) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
  
      const user = result[0];
      res.json({
        id_usr: user.id_usr,
        usuario: user.usuario,
        nombres: user.nombres,
        per_id: user.per_id
      });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  };
  


// Registro de usuario
export const registrarUsuario = async (req, res) => {
    const { cedula, nombres, direccion, telefono, usuario, clave, per_id } = req.body;

    if (!cedula || !nombres || !direccion || !telefono || !usuario || !clave || !per_id) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Hashear la clave
        const hashedPassword = await bcrypt.hash(clave, 10);

        // Insertar el usuario en la base de datos
        await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, usuario, hashedPassword, per_id]
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);  // Agregar para depurar el error
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

// Obtener usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario');
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);  // Agregar para depurar el error
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};
