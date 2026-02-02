const API_BASE_URL = 'http://localhost:8081/api';

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
    { id: 1, name: 'Dr. Rajesh Sharma', specialization: 'Cardiology', experience: '15 years', qualification: 'MD DM Cardiology' },
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

// Booking confirmation
async function confirmBooking() {
    // Show loading state
    const confirmBtn = document.getElementById('doctor-next');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    confirmBtn.disabled = true;
    
    try {
        // Validate all data before proceeding
        if (!bookingData.patient.name || !bookingData.patient.email || !bookingData.patient.phone || 
            !bookingData.patient.dateOfBirth || !bookingData.patient.gender || !bookingData.patient.address) {
            throw new Error('Please fill in all patient details');
        }
        
        if (!bookingData.hospital) {
            throw new Error('Please select a hospital');
        }
        
        if (!bookingData.doctor.name) {
            throw new Error('Please select a doctor');
        }
        
        if (!bookingData.date || !bookingData.time) {
            throw new Error('Please select date and time');
        }
        
        // Check if backend is accessible
        try {
            await fetch(`${API_BASE_URL}/doctors`);
        } catch (error) {
            throw new Error('Unable to connect to server. Please check if the backend is running on port 8080');
        }
        
        // First create the patient
        console.log('Creating patient...', bookingData.patient);
        const patient = await createPatient(bookingData.patient);
        console.log('Patient created:', patient);
        
        // Then create the doctor (if not exists)
        console.log('Creating/finding doctor...', bookingData.doctor);
        const doctor = await createDoctor(bookingData.doctor);
        console.log('Doctor created/found:', doctor);
        
        // Finally create the appointment
        const appointmentDateTime = `${bookingData.date}T${bookingData.time}:00`;
        console.log('Creating appointment...', { patientId: patient.id, doctorId: doctor.id, appointmentDateTime });
        const appointment = await createAppointment(patient.id, doctor.id, appointmentDateTime);
        console.log('Appointment created:', appointment);
        
        // Show confirmation
        showConfirmation(patient, doctor, appointment);
        
    } catch (error) {
        console.error('Booking failed:', error);
        
        // Show specific error message to user
        let userMessage = 'Sorry, there was an error booking your appointment.';
        
        if (error.message.includes('Unable to connect to server')) {
            userMessage = 'Unable to connect to server. Please make sure the backend is running and try again.';
        } else if (error.message.includes('Failed to create patient')) {
            userMessage = 'Error creating patient record. Please check your details and try again.';
        } else if (error.message.includes('Failed to create doctor')) {
            userMessage = 'Error processing doctor information. Please try again.';
        } else if (error.message.includes('Failed to create appointment')) {
            userMessage = 'Error creating appointment. The doctor might not be available at this time. Please try a different time.';
        } else if (error.message.includes('Please fill in')) {
            userMessage = error.message;
        } else if (error.message.includes('Please select')) {
            userMessage = error.message;
        } else if (error.message.includes('HTTP error! status: 400')) {
            userMessage = 'Invalid data provided. Please check all fields and try again.';
        } else if (error.message.includes('HTTP error! status: 500')) {
            userMessage = 'Server error occurred. Please try again later.';
        }
        
        alert(`❌ Booking Failed!\n\n${userMessage}\n\nError details: ${error.message}`);
        
        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }
}

// API functions
async function apiCall(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data) {
        config.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.text();
                if (errorData) {
                    errorMessage += ` - ${errorData}`;
                }
            } catch (e) {
                // If we can't parse the error response, use the default message
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

async function createPatient(patientData) {
    try {
        return await apiCall('/patients', 'POST', patientData);
    } catch (error) {
        throw new Error(`Failed to create patient: ${error.message}`);
    }
}

async function createDoctor(doctorData) {
    try {
        // Check if doctor already exists
        const doctors = await apiCall('/doctors');
        const existingDoctor = doctors.find(d => d.name === doctorData.name);
        if (existingDoctor) {
            return existingDoctor;
        }
        
        // Create new doctor
        const newDoctor = {
            name: doctorData.name,
            specialization: doctorData.specialization,
            email: `${doctorData.name.toLowerCase().replace(/\s+/g, '.')}@cureconnect.com`,
            phone: '555-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        };
        
        return await apiCall('/doctors', 'POST', newDoctor);
    } catch (error) {
        throw new Error(`Failed to create doctor: ${error.message}`);
    }
}

async function createAppointment(patientId, doctorId, appointmentDateTime) {
    try {
        const appointmentData = {
            patientId: patientId,
            doctorId: doctorId,
            appointmentDateTime: appointmentDateTime,
            notes: `Appointment booked through CureConnect for ${bookingData.hospital}`
        };
        
        return await apiCall('/appointments', 'POST', appointmentData);
    } catch (error) {
        throw new Error(`Failed to create appointment: ${error.message}`);
    }
}

// Confirmation display
function showConfirmation(patient, doctor, appointment) {
    const bookingDetails = document.getElementById('booking-details');
    const appointmentDate = new Date(appointment.appointmentDateTime);
    
    // Calculate age from date of birth
    const dob = new Date(patient.dateOfBirth);
    const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
    
    bookingDetails.innerHTML = `
        <h3><i class="fas fa-clipboard-check"></i> Booking Confirmation</h3>
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
            <span class="detail-value">#${appointment.id}</span>
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
    // Create a simple text receipt
    const receipt = `
CURECONNECT APPOINTMENT RECEIPT
===============================
Patient: ${bookingData.patient.name}
Age: ${Math.floor((new Date() - new Date(bookingData.patient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years
Gender: ${bookingData.patient.gender}
Hospital: ${bookingData.hospital}
Doctor: ${bookingData.doctor.name}
Specialization: ${bookingData.doctor.specialization}
Date: ${new Date(bookingData.date).toLocaleDateString()}
Time: ${formatTime(bookingData.time)}
===============================
Thank you for choosing CureConnect!
    `;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cureconnect-appointment-receipt.txt';
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

// Admin functionality
let isAdminLoggedIn = false;
let reminders = JSON.parse(localStorage.getItem('cureconnect_reminders') || '[]');

function showAdminLogin() {
    document.getElementById('admin-modal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    // Simple authentication (in production, use proper authentication)
    if (username === 'admin' && password === 'admin123') {
        isAdminLoggedIn = true;
        closeAdminModal();
        showSection('admin-dashboard');
        loadAdminData();
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    showSection('welcome');
}

function showAdminTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(`admin-${tabName}`).classList.add('active');
    
    // Load data for the selected tab
    switch(tabName) {
        case 'appointments':
            refreshAppointments();
            break;
        case 'patients':
            refreshPatients();
            break;
        case 'doctors':
            refreshDoctors();
            break;
        case 'reminders':
            refreshReminders();
            break;
    }
}

async function loadAdminData() {
    refreshAppointments();
}

async function refreshAppointments() {
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading appointments...</p></div>';
    
    try {
        const appointments = await apiCall('/appointments');
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No appointments found</p>
                </div>
            `;
            return;
        }
        
        appointmentsList.innerHTML = `
            <div class="table-header" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
                <div>Patient</div>
                <div>Doctor</div>
                <div>Date & Time</div>
                <div>Status</div>
                <div>Actions</div>
            </div>
            ${appointments.map(appointment => `
                <div class="table-row" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
                    <div class="table-cell">
                        <span class="cell-label">Patient</span>
                        <span class="cell-value">${appointment.patient?.name || 'N/A'}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Doctor</span>
                        <span class="cell-value">${appointment.doctor?.name || 'N/A'}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Date & Time</span>
                        <span class="cell-value">${new Date(appointment.appointmentDateTime).toLocaleString()}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Status</span>
                        <span class="cell-value">Scheduled</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Actions</span>
                        <div class="action-buttons">
                            <button class="action-btn call-btn" onclick="callPatient('${appointment.patient?.phone}', '${appointment.patient?.name}')">
                                <i class="fas fa-phone"></i> Call
                            </button>
                            <button class="action-btn edit-btn" onclick="editAppointment(${appointment.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    } catch (error) {
        appointmentsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading appointments: ${error.message}</p>
            </div>
        `;
    }
}

async function refreshPatients() {
    const patientsList = document.getElementById('patients-list');
    patientsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading patients...</p></div>';
    
    try {
        const patients = await apiCall('/patients');
        
        if (patients.length === 0) {
            patientsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-times"></i>
                    <p>No patients found</p>
                </div>
            `;
            return;
        }
        
        patientsList.innerHTML = `
            <div class="table-header" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
                <div>Name</div>
                <div>Age/Gender</div>
                <div>Contact</div>
                <div>Address</div>
                <div>Actions</div>
            </div>
            ${patients.map(patient => {
                const age = Math.floor((new Date() - new Date(patient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
                return `
                    <div class="table-row" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
                        <div class="table-cell">
                            <span class="cell-label">Name</span>
                            <span class="cell-value">${patient.name}</span>
                        </div>
                        <div class="table-cell">
                            <span class="cell-label">Age/Gender</span>
                            <span class="cell-value">${age} years, ${patient.gender}</span>
                        </div>
                        <div class="table-cell">
                            <span class="cell-label">Contact</span>
                            <span class="cell-value">${patient.phone}<br>${patient.email}</span>
                        </div>
                        <div class="table-cell">
                            <span class="cell-label">Address</span>
                            <span class="cell-value">${patient.address}</span>
                        </div>
                        <div class="table-cell">
                            <span class="cell-label">Actions</span>
                            <div class="action-buttons">
                                <button class="action-btn call-btn" onclick="callPatient('${patient.phone}', '${patient.name}')">
                                    <i class="fas fa-phone"></i> Call
                                </button>
                                <button class="action-btn edit-btn" onclick="editPatient(${patient.id})">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    } catch (error) {
        patientsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading patients: ${error.message}</p>
            </div>
        `;
    }
}

async function refreshDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    doctorsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading doctors...</p></div>';
    
    try {
        const doctors = await apiCall('/doctors');
        
        if (doctors.length === 0) {
            doctorsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-md-times"></i>
                    <p>No doctors found</p>
                </div>
            `;
            return;
        }
        
        doctorsList.innerHTML = `
            <div class="table-header" style="grid-template-columns: 1fr 1fr 1fr 1fr;">
                <div>Name</div>
                <div>Specialization</div>
                <div>Contact</div>
                <div>Actions</div>
            </div>
            ${doctors.map(doctor => `
                <div class="table-row" style="grid-template-columns: 1fr 1fr 1fr 1fr;">
                    <div class="table-cell">
                        <span class="cell-label">Name</span>
                        <span class="cell-value">${doctor.name}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Specialization</span>
                        <span class="cell-value">${doctor.specialization}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Contact</span>
                        <span class="cell-value">${doctor.phone}<br>${doctor.email}</span>
                    </div>
                    <div class="table-cell">
                        <span class="cell-label">Actions</span>
                        <div class="action-buttons">
                            <button class="action-btn call-btn" onclick="callDoctor('${doctor.phone}', '${doctor.name}')">
                                <i class="fas fa-phone"></i> Call
                            </button>
                            <button class="action-btn edit-btn" onclick="editDoctor(${doctor.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    } catch (error) {
        doctorsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading doctors: ${error.message}</p>
            </div>
        `;
    }
}

function refreshReminders() {
    const remindersList = document.getElementById('reminders-list');
    
    if (reminders.length === 0) {
        remindersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <p>No reminders scheduled</p>
            </div>
        `;
        return;
    }
    
    remindersList.innerHTML = `
        <div class="table-header" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
            <div>Patient</div>
            <div>Phone</div>
            <div>Appointment</div>
            <div>Reminder Time</div>
            <div>Actions</div>
        </div>
        ${reminders.map((reminder, index) => `
            <div class="table-row" style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr;">
                <div class="table-cell">
                    <span class="cell-label">Patient</span>
                    <span class="cell-value">${reminder.patientName}</span>
                </div>
                <div class="table-cell">
                    <span class="cell-label">Phone</span>
                    <span class="cell-value">${reminder.phone}</span>
                </div>
                <div class="table-cell">
                    <span class="cell-label">Appointment</span>
                    <span class="cell-value">${new Date(reminder.appointmentDateTime).toLocaleString()}</span>
                </div>
                <div class="table-cell">
                    <span class="cell-label">Reminder Time</span>
                    <span class="cell-value">${new Date(reminder.reminderDateTime).toLocaleString()}</span>
                </div>
                <div class="table-cell">
                    <span class="cell-label">Actions</span>
                    <div class="action-buttons">
                        <button class="action-btn call-btn" onclick="callPatient('${reminder.phone}', '${reminder.patientName}')">
                            <i class="fas fa-phone"></i> Call Now
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteReminder(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

// Call functionality
function callPatient(phone, name) {
    const confirmed = confirm(`Call ${name} at ${phone}?\n\nThis will open your phone app or dialer.`);
    if (confirmed) {
        // Try to open phone app (works on mobile devices)
        window.open(`tel:${phone}`, '_self');
        
        // Also show a notification
        alert(`📞 Calling ${name} at ${phone}\n\nReminder: Discuss appointment details and confirm attendance.`);
    }
}

function callDoctor(phone, name) {
    const confirmed = confirm(`Call Dr. ${name} at ${phone}?\n\nThis will open your phone app or dialer.`);
    if (confirmed) {
        window.open(`tel:${phone}`, '_self');
        alert(`📞 Calling Dr. ${name} at ${phone}`);
    }
}

// Reminder functionality
function scheduleReminder() {
    if (!bookingData.patient.name) {
        alert('No appointment data found!');
        return;
    }
    
    const reminderTime = prompt(
        `Schedule a reminder call for ${bookingData.patient.name}?\n\n` +
        `Appointment: ${new Date(bookingData.date + 'T' + bookingData.time).toLocaleString()}\n\n` +
        `Enter hours before appointment to call (e.g., 24 for 1 day before):`
    );
    
    if (reminderTime && !isNaN(reminderTime)) {
        const appointmentDateTime = new Date(bookingData.date + 'T' + bookingData.time);
        const reminderDateTime = new Date(appointmentDateTime.getTime() - (reminderTime * 60 * 60 * 1000));
        
        const reminder = {
            patientName: bookingData.patient.name,
            phone: bookingData.patient.phone,
            appointmentDateTime: appointmentDateTime.toISOString(),
            reminderDateTime: reminderDateTime.toISOString(),
            doctorName: bookingData.doctor.name,
            hospital: bookingData.hospital
        };
        
        reminders.push(reminder);
        localStorage.setItem('cureconnect_reminders', JSON.stringify(reminders));
        
        alert(`✅ Reminder scheduled!\n\nWe will remind you to call ${bookingData.patient.name} on ${reminderDateTime.toLocaleString()}`);
    }
}

function deleteReminder(index) {
    if (confirm('Delete this reminder?')) {
        reminders.splice(index, 1);
        localStorage.setItem('cureconnect_reminders', JSON.stringify(reminders));
        refreshReminders();
    }
}

// Edit functions (placeholder implementations)
function editAppointment(appointmentId) {
    alert(`Edit appointment #${appointmentId}\n\nThis feature will be implemented in the next version.`);
}

function editPatient(patientId) {
    alert(`Edit patient #${patientId}\n\nThis feature will be implemented in the next version.`);
}

function editDoctor(doctorId) {
    alert(`Edit doctor #${doctorId}\n\nThis feature will be implemented in the next version.`);
}

// Check for due reminders on page load
document.addEventListener('DOMContentLoaded', () => {
    checkDueReminders();
    setInterval(checkDueReminders, 60000); // Check every minute
});

function checkDueReminders() {
    const now = new Date();
    const dueReminders = reminders.filter(reminder => {
        const reminderTime = new Date(reminder.reminderDateTime);
        return reminderTime <= now && reminderTime > new Date(now.getTime() - 60000); // Within last minute
    });
    
    dueReminders.forEach(reminder => {
        if (confirm(`🔔 Reminder: Call ${reminder.patientName}\n\nAppointment: ${new Date(reminder.appointmentDateTime).toLocaleString()}\nPhone: ${reminder.phone}\n\nCall now?`)) {
            callPatient(reminder.phone, reminder.patientName);
        }
    });
}

// Fix event handling for better compatibility
function selectHospital(hospitalName) {
    // Remove previous selection
    document.querySelectorAll('.hospital-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card - find the card that was clicked
    const clickedCard = Array.from(document.querySelectorAll('.hospital-card')).find(card => 
        card.textContent.includes(hospitalName)
    );
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    bookingData.hospital = hospitalName;
    document.getElementById('hospital-next').disabled = false;
}

function selectDoctor(doctorId) {
    // Remove previous selection
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card - find the card that was clicked
    const clickedCard = Array.from(document.querySelectorAll('.doctor-card')).find(card => 
        card.onclick && card.onclick.toString().includes(doctorId)
    );
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
    
    const selectedDoctor = sampleDoctors.find(doctor => doctor.id === doctorId);
    bookingData.doctor = selectedDoctor;
    document.getElementById('doctor-next').disabled = false;
}