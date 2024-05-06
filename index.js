const express = require('express');
const cors = require('cors'); // Import the cors middleware

const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
require('./passport');


const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/users', userRoutes);

// app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res)=>{
//   res.status(200).send({
//     success: true,
//     user: req.user
//   });
// });


// Root endpoint
app.use('/', (req, res) => {
  res.send('Welcome to Aarogya Hospital Management Web Application');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
