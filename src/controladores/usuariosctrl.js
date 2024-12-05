import { conmysql } from "../db.js";
import bcrypt from "bcrypt";

export const loginUsuario = async (req, res) => {
    const { usuario, clave } = req.body;
    
    // Validar que los datos de entrada sean correctos
    if (!usuario || !clave) {
        return res.status(400).json({ message: 'Usuario y clave son requeridos' });
    }

    try {
        const [result] = await conmysql.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
        
        // Verificar si el usuario existe
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const validPassword = await bcrypt.compare(clave, result[0].clave);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Responder con éxito si todo es válido
        res.json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
    } catch (error) {
        console.error('Error:', error);  // Agregar para depurar el error
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

export const registrarUsuario = async (req, res) => {
    const { cedula, nombres, direccion, telefono, usuario, clave, per_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(clave, 10);
        await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, usuario, hashedPassword, per_id]
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};
 //agregame para ver los usuarios
 export const obtenerUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};
