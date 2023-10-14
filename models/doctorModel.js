// model/doctorModel.js
const pool = require('../database');

// Create a new doctor
const createDoctor = async (doctorData) => {
  try {
    const query = 'INSERT INTO doctors SET ?';
    const [result] = await pool.query(query, doctorData);
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all doctors
const getAllDoctors = async () => {
  try {
    const query = 'SELECT * FROM doctors';
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

// Get doctor by ID
const getDoctorById = async (doctorId) => {
  try {
    const query = 'SELECT * FROM doctors WHERE id = ?';
    const [rows] = await pool.query(query, [doctorId]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Update doctor by ID
const updateDoctorById = async (doctorId, doctorData) => {
  try {
    const query = 'UPDATE doctors SET ? WHERE id = ?';
    await pool.query(query, [doctorData, doctorId]);
  } catch (error) {
    throw new Error(error);
  }
};

// Delete doctor by ID
const deleteDoctorById = async (doctorId) => {
  try {
    const query = 'DELETE FROM doctors WHERE id = ?';
    await pool.query(query, [doctorId]);
  } catch (error) {
    throw new Error(error);
  }
};

// Export the Doctor model functions
module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
