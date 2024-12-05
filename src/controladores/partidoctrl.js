import { conmysql } from "../db.js";

export const registrarPartido = async (req, res) => {
    const { eq_uno, eq_dos, fecha_par } = req.body;
    try {
        await conmysql.query(
            'INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_par) VALUES (?, ?, ?, ?)',
            [eq_uno, eq_dos, fecha_par, 'activo']
        );
        res.status(201).json({ message: 'Partido registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el partido' });
    }
};

export const obtenerPartidosActivos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM partido WHERE estado_par = "activo"');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los partidos' });
    }
};
