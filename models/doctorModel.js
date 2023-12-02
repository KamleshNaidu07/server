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
const getAllDoctors = async (page, limit, searchTerm) => {
  try {
    let query = 'SELECT * FROM doctors';
    const countQuery = 'SELECT COUNT(*) AS total FROM doctors'; // Query to get total count
    let totalCount = 0;

    const values = [];

    if (searchTerm) {
      query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone_number LIKE ? OR CONCAT(first_name, " ", last_name) LIKE ?';
      values.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
    }

    if (limit) {
      const offset = (page - 1) * limit;
      query += ' LIMIT ? OFFSET ?';
      values.push(limit, offset);

      const [countRows] = await pool.query(countQuery);
      totalCount = countRows[0].total;
    }

    const [rows] = await pool.query(query, values);
    // return rows;
    return { data: rows, totalCount }; 
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
