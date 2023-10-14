const pool = require('../database');

const createAppointment = async (appointmentData) => {
  try {
    const query = 'INSERT INTO appointments SET ?';
    const [result] = await pool.query(query, appointmentData);
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllAppointments = async () => {
  try {
    const query = 'SELECT * FROM appointments';
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getAppointmentById = async (appointmentId) => {
  try {
    const query = 'SELECT * FROM appointments WHERE id = ?';
    const [rows] = await pool.query(query, [appointmentId]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const updateAppointmentById = async (appointmentId, appointmentData) => {
  try {
    const query = 'UPDATE appointments SET ? WHERE id = ?';
    await pool.query(query, [appointmentData, appointmentId]);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAppointmentById = async (appointmentId) => {
  try {
    const query = 'DELETE FROM appointments WHERE id = ?';
    await pool.query(query, [appointmentId]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
