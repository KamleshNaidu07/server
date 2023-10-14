// controller/doctorController.js
const Doctor = require('../models/doctorModel');

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    const doctorId = await Doctor.createDoctor(doctorData);
    res.status(201).json({ id: doctorId, message: 'Doctor created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create doctor' });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.getAllDoctors();
    res.json(doctors);
  } catch (error) {
    // console.error(error); // Log the error to the console for debugging purposes
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.getDoctorById(doctorId);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ error: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
};

// Update doctor by ID
const updateDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorData = req.body;
    await Doctor.updateDoctorById(doctorId, doctorData);
    res.json({ message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update doctor' });
  }
};

// Delete doctor by ID
const deleteDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    await Doctor.deleteDoctorById(doctorId);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
};

// Export the Doctor controller functions
module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
