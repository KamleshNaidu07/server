const prescriptionModel = require('../models/prescriptionModel');

// Create a new prescription
const createPrescription = async (req, res, next) => {
  try {
    const prescriptionData = req.body;
    const prescriptionId = await prescriptionModel.createPrescription(prescriptionData);
    res.status(201).json({ id: prescriptionId });
  } catch (error) {
    next(error);
  }
};

// Get all prescriptions
const getAllPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await prescriptionModel.getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    next(error);
  }
};

// Get prescription by ID
const getPrescriptionById = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    const prescription = await prescriptionModel.getPrescriptionById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    next(error);
  }
};

// Update prescription by ID
const updatePrescriptionById = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    const prescriptionData = req.body;
    await prescriptionModel.updatePrescriptionById(prescriptionId, prescriptionData);
    res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete prescription by ID
const deletePrescriptionById = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    await prescriptionModel.deletePrescriptionById(prescriptionId);
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
};
