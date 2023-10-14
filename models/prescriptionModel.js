const pool = require('../database');

// Create a new prescription
const createPrescription = async (prescriptionData) => {
  try {
    const query = 'INSERT INTO prescriptions SET ?';
    const [result] = await pool.query(query, prescriptionData);
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all prescriptions
const getAllPrescriptions = async () => {
  try {
    const query = 'SELECT * FROM prescriptions';
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

// Get prescription by ID
const getPrescriptionById = async (prescriptionId) => {
  try {
    const query = 'SELECT * FROM prescriptions WHERE id = ?';
    const [rows] = await pool.query(query, [prescriptionId]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Update prescription by ID
const updatePrescriptionById = async (prescriptionId, prescriptionData) => {
  try {
    const query = 'UPDATE prescriptions SET ? WHERE id = ?';
    await pool.query(query, [prescriptionData, prescriptionId]);
  } catch (error) {
    throw new Error(error);
  }
};

// Delete prescription by ID
const deletePrescriptionById = async (prescriptionId) => {
  try {
    const query = 'DELETE FROM prescriptions WHERE id = ?';
    await pool.query(query, [prescriptionId]);
  } catch (error) {
    throw new Error(error);
  }
};

// Export the Prescription model functions
module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
};
