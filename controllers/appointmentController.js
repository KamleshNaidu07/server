const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();

    // Fetch doctor and patient details for each appointment
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (appointment) => {
        const doctor = await doctorModel.getDoctorById(appointment.doctor_id);
        const patient = await patientModel.getPatientById(appointment.patient_id);
        return {
          id: appointment.id,
          doctor,
          patient,
          appointment_date: appointment.appointment_date,
          created_at: appointment.created_at,
          updated_at: appointment.updated_at,
        };
      })
    );

    res.json(appointmentsWithDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await appointmentModel.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const doctor = await doctorModel.getDoctorById(appointment.doctor_id);
    const patient = await patientModel.getPatientById(appointment.patient_id);

    const appointmentWithDetails = {
      id: appointment.id,
      doctor,
      patient,
      appointment_date: appointment.appointment_date,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };

    res.json(appointmentWithDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createAppointment = async (req, res) => {
  const { doctor_id, patient_id, appointment_date } = req.body;

  try {
    const doctor = await doctorModel.getDoctorById(doctor_id);
    const patient = await patientModel.getPatientById(patient_id);

    if (!doctor || !patient) {
      return res.status(404).json({ error: 'Doctor or patient not found' });
    }

    const appointmentData = {
      doctor_id,
      patient_id,
      appointment_date,
    };

    const appointmentId = await appointmentModel.createAppointment(appointmentData);

    res.status(201).json({ id: appointmentId });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const { doctor_id, patient_id, appointment_date } = req.body;

  try {
    const doctor = await doctorModel.getDoctorById(doctor_id);
    const patient = await patientModel.getPatientById(patient_id);

    if (!doctor || !patient) {
      return res.status(404).json({ error: 'Doctor or patient not found' });
    }

    const appointmentData = {
      doctor_id,
      patient_id,
      appointment_date,
    };

    await appointmentModel.updateAppointment(appointmentId, appointmentData);

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await appointmentModel.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await appointmentModel.deleteAppointment(appointmentId);

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
