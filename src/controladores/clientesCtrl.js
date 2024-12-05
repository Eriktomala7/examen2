import e from "express";
import { conmysql } from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM clientes");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener clientes" });
    }
};

export const getClientesid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el cliente" });
    }
};
