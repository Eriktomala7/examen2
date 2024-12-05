const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para manejo de contraseñas

exports.login = async (req, res) => {
    const { usuario, clave } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(clave, user.clave);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user.id_usr, per_id: user.per_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, per_id: user.per_id });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
