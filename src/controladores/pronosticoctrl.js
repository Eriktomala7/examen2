import { conmysql } from "../db.js";

export const registrarPronostico = async (req, res) => {
    const { id_usr, id_par, id_res, valor } = req.body;
    try {
        const fechaRegistro = new Date();
        await conmysql.query(
            'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, ?)',
            [id_usr, id_par, id_res, valor, fechaRegistro]
        );
        res.status(201).json({ message: 'Pronóstico registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el pronóstico' });
    }
};

export const obtenerPronosticosPorUsuario = async (req, res) => {
    const { id_usr } = req.params;
    try {
        const [result] = await conmysql.query(
            `SELECT p.*, par.fecha_par, e1.nombre_eq AS equipo_local, e2.nombre_eq AS equipo_visitante
             FROM pronostico p
             INNER JOIN partido par ON p.id_par = par.id_par
             INNER JOIN equipo e1 ON par.eq_uno = e1.id_eq
             INNER JOIN equipo e2 ON par.eq_dos = e2.id_eq
             WHERE p.id_usr = ?`,
            [id_usr]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pronósticos' });
    }
};
