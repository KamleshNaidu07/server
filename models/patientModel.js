const pool = require('../database');

const createPatient = async (patientData) => {
  try {
    const query = 'INSERT INTO patients SET ?';
    const [result] = await pool.query(query, patientData);
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllPatients = async (page, limit, searchTerm) => {
  try {
    let query = 'SELECT * FROM patients';
    const countQuery = 'SELECT COUNT(*) AS total FROM patients'; // Query to get total count
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

const getPatientById = async (patientId) => {
  try {
    const query = 'SELECT * FROM patients WHERE id = ?';
    const [rows] = await pool.query(query, [patientId]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const updatePatientById = async (patientId, patientData) => {
  try {
    const query = 'UPDATE patients SET ? WHERE id = ?';
    await pool.query(query, [patientData, patientId]);
  } catch (error) {
    throw new Error(error);
  }
};

const deletePatientById = async (patientId) => {
  try {
    const query = 'DELETE FROM patients WHERE id = ?';
    await pool.query(query, [patientId]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
