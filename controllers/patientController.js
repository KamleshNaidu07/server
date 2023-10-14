const patientModel = require('../models/patientModel');

// Get all patients
const getAllPatients = async (req, res) => {
  const { page = 1, limit = null, searchTerm = '' } = req.query; 
  try {
    const patients = await patientModel.getAllPatients(Number(page), Number(limit), searchTerm);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await patientModel.getPatientById(id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

// Create a new patient
const createPatient = async (req, res) => {
  const patientData = req.body;
  try {
    const patientId = await patientModel.createPatient(patientData);
    res.json({ id: patientId, message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

// Update patient by ID
const updatePatientById = async (req, res) => {
  const { id } = req.params;
  const patientData = req.body;
  try {
    await patientModel.updatePatientById(id, patientData);
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

// Delete patient by ID
const deletePatientById = async (req, res) => {
  const { id } = req.params;
  try {
    await patientModel.deletePatientById(id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatientById,
  deletePatientById,
};
