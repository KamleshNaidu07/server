const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

// Create a new doctor
router.post('/', doctorController.createDoctor);

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Update doctor by ID
router.put('/:id', doctorController.updateDoctorById);

// Delete doctor by ID
router.delete('/:id', doctorController.deleteDoctorById);

// Export the Doctor routes
module.exports = router;
