const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Create a new prescription
router.post('/', prescriptionController.createPrescription);

// Get all prescriptions
router.get('/', prescriptionController.getAllPrescriptions);

// Get prescription by ID
router.get('/:id', prescriptionController.getPrescriptionById);

// Update prescription by ID
router.put('/:id', prescriptionController.updatePrescriptionById);

// Delete prescription by ID
router.delete('/:id', prescriptionController.deletePrescriptionById);

module.exports = router;
