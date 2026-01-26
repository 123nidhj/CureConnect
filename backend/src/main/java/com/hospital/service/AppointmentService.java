package com.hospital.service;

import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
    
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }
    
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
    
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
    
    public Appointment bookAppointment(Long patientId, Long doctorId, LocalDateTime dateTime, String notes) {
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        // Check if doctor is available
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorAndDateTime(doctorId, dateTime);
        if (!existingAppointments.isEmpty()) {
            throw new RuntimeException("Doctor is not available at this time");
        }
        
        Appointment appointment = new Appointment(patient, doctor, dateTime, notes);
        return appointmentRepository.save(appointment);
    }
    
    public Appointment updateAppointmentStatus(Long appointmentId, Appointment.AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
    
    public void cancelAppointment(Long appointmentId) {
        updateAppointmentStatus(appointmentId, Appointment.AppointmentStatus.CANCELLED);
    }
    
    public List<Doctor> getAvailableDoctors(LocalDateTime dateTime) {
        return doctorRepository.findAvailableDoctors(dateTime);
    }
}