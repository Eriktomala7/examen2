import { conmysql } from "../db.js";
import bcrypt from "bcrypt";

export const loginUsuario = async (req, res) => {
    const { usuario, clave } = req.body;
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
        if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(clave, result[0].clave);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        res.json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
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
