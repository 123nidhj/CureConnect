// Demo version for GitHub Pages (works without backend)
const API_BASE_URL = 'demo'; // Demo mode

// Global variables to store booking data
let bookingData = {
    date: '',
    time: '',
    patient: {},
    hospital: '',
    doctor: {}
};

// Indian doctors data with specializations
const sampleDoctors = [
    { id: 1, name: 'Dr. Rajesh Sharma', specialization: 'Cardiology', experience: '15 years', qualification: 'MD, DM Cardiology' },
    { id: 2, name: 'Dr. Priya Patel', specialization: 'Dermatology', experience: '12 years', qualification: 'MD Dermatology' },
    { id: 3, name: 'Dr. Amit Kumar', specialization: 'Pediatrics', experience: '10 years', qualification: 'MD Pediatrics' },
    { id: 4, name: 'Dr. Sunita Singh', specialization: 'Orthopedics', experience: '18 years', qualification: 'MS Orthopedics' },
    { id: 5, name: 'Dr. Vikram Gupta', specialization: 'Neurology', experience: '14 years', qualification: 'DM Neurology' },
    { id: 6, name: 'Dr. Kavita Reddy', specialization: 'Gynecology', experience: '16 years', qualification: 'MD Gynecology' },
    { id: 7, name: 'Dr. Arjun Mehta', specialization: 'Gastroenterology', experience: '13 years', qualification: 'DM Gastroenterology' },
    { id: 8, name: 'Dr. Deepika Joshi', specialization: 'Ophthalmology', experience: '11 years', qualification: 'MS Ophthalmology' },
    { id: 9, name: 'Dr. Rohit Agarwal', specialization: 'Urology', experience: '17 years', qualification: 'MCh Urology' },
    { id: 10, name: 'Dr. Meera Nair', specialization: 'Psychiatry', experience: '9 years', qualification: 'MD Psychiatry' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').min = today;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('appointment-date').value = tomorrow.toISOString().split('T')[0];
});

// Navigation functions
function startBooking() {
    showSection('step1');
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function nextStep(stepNumber) {
    if (validateCurrentStep()) {
        showSection(`step${stepNumber}`);
        if (stepNumber === 4) {
            loadDoctors();
        }
    }
}

function prevStep(stepNumber) {
    showSection(`step${stepNumber}`);
}

// Validation functions
function validateCurrentStep() {
    const activeSection = document.querySelector('.section.active');
    const sectionId = activeSection.id;
    
    switch(sectionId) {
        case 'step1':
            return validateStep1();
        case 'step2':
            return validateStep2();
        case 'step3':
            return validateStep3();
        default:
            return true;
    }
}

function validateStep1() {
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    
    if (!date || !time) {
        alert('Please select both date and time for your appointment.');
        return false;
    }
    
    bookingData.date = date;
    bookingData.time = time;
    return true;
}

function validateStep2() {
    const name = document.getElementById('patient-name').value;
    const email = document.getElementById('patient-email').value;
    const phone = document.getElementById('patient-phone').value;
    const dob = document.getElementById('patient-dob').value;
    const gender = document.getElementById('patient-gender').value;
    const address = document.getElementById('patient-address').value;
    
    if (!name || !email || !phone || !dob || !gender || !address) {
        alert('Please fill in all your details including gender.');
        return false;
    }
    
    bookingData.patient = { name, email, phone, dateOfBirth: dob, gender, address };
    return true;
}

function validateStep3() {
    if (!bookingData.hospital) {
        alert('Please select a hospital.');
        return false;
    }
    return true;
}

// Hospital selection
function selectHospital(hospitalName) {
    // Remove previous selection
    document.querySelectorAll('.hospital-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    event.target.closest('.hospital-card').classList.add('selected');
    
    bookingData.hospital = hospitalName;
    document.getElementById('hospital-next').disabled = false;
}

// Doctor functions
function loadDoctors() {
    const doctorOptions = document.getElementById('doctor-options');
    const selectedTime = formatTime(bookingData.time);
    
    doctorOptions.innerHTML = sampleDoctors.map(doctor => `
        <div class="doctor-card" onclick="selectDoctor(${doctor.id})">
            <div class="doctor-avatar">${doctor.name.split(' ')[1][0]}</div>
            <div class="doctor-info">
                <h4>${doctor.name}</h4>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                <p><strong>Experience:</strong> ${doctor.experience}</p>
                <p><strong>Qualification:</strong> ${doctor.qualification}</p>
                <p><strong>Available at:</strong> ${selectedTime}</p>
            </div>
        </div>
    `).join('');
}

function selectDoctor(doctorId) {
    // Remove previous selection
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    event.target.closest('.doctor-card').classList.add('selected');
    
    const selectedDoctor = sampleDoctors.find(doctor => doctor.id === doctorId);
    bookingData.doctor = selectedDoctor;
    document.getElementById('doctor-next').disabled = false;
}

// Demo booking confirmation (without backend)
async function confirmBooking() {
    const confirmBtn = document.getElementById('doctor-next');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    confirmBtn.disabled = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create demo appointment object
    const appointment = {
        id: Math.floor(Math.random() * 1000) + 1,
        appointmentDateTime: `${bookingData.date}T${bookingData.time}:00`
    };
    
    // Show confirmation
    showConfirmation(bookingData.patient, bookingData.doctor, appointment);
}

// Confirmation display
function showConfirmation(patient, doctor, appointment) {
    const bookingDetails = document.getElementById('booking-details');
    const appointmentDate = new Date(appointment.appointmentDateTime);
    
    // Calculate age from date of birth
    const dob = new Date(patient.dateOfBirth);
    const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
    
    bookingDetails.innerHTML = `
        <h3><i class="fas fa-clipboard-check"></i> Booking Confirmation (Demo)</h3>
        <div class="demo-notice" style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <strong>🎯 This is a Demo Version</strong><br>
            No actual appointment is booked. This showcases the booking flow.
        </div>
        <div class="detail-row">
            <span class="detail-label">Patient Name:</span>
            <span class="detail-value">${patient.name}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Age:</span>
            <span class="detail-value">${age} years</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">DOB:</span>
            <span class="detail-value">${new Date(patient.dateOfBirth).toLocaleDateString('en-GB')}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Gender:</span>
            <span class="detail-value">${patient.gender}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Hospital:</span>
            <span class="detail-value">${bookingData.hospital}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Doctor:</span>
            <span class="detail-value">${doctor.name}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Specialization:</span>
            <span class="detail-value">${doctor.specialization}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${appointmentDate.toLocaleDateString()}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Time:</span>
            <span class="detail-value">${formatTime(bookingData.time)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Appointment ID:</span>
            <span class="detail-value">#DEMO${appointment.id}</span>
        </div>
    `;
    
    showSection('confirmation');
}

// Utility functions
function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
}

function downloadReceipt() {
    const receipt = `
CURECONNECT APPOINTMENT RECEIPT (DEMO)
======================================
Patient: ${bookingData.patient.name}
Age: ${Math.floor((new Date() - new Date(bookingData.patient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years
Gender: ${bookingData.patient.gender}
Hospital: ${bookingData.hospital}
Doctor: ${bookingData.doctor.name}
Specialization: ${bookingData.doctor.specialization}
Date: ${new Date(bookingData.date).toLocaleDateString()}
Time: ${formatTime(bookingData.time)}
======================================
This is a DEMO receipt.
Thank you for trying CureConnect!
    `;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cureconnect-demo-receipt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function bookAnother() {
    // Reset booking data
    bookingData = {
        date: '',
        time: '',
        patient: {},
        hospital: '',
        doctor: {}
    };
    
    // Reset form fields
    document.getElementById('appointment-date').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-email').value = '';
    document.getElementById('patient-phone').value = '';
    document.getElementById('patient-dob').value = '';
    document.getElementById('patient-gender').value = '';
    document.getElementById('patient-address').value = '';
    
    // Remove selections
    document.querySelectorAll('.hospital-card, .doctor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Disable buttons
    document.getElementById('hospital-next').disabled = true;
    document.getElementById('doctor-next').disabled = true;
    
    // Go back to welcome
    showSection('welcome');
}