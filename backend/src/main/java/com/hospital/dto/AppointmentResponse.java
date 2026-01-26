package com.hospital.dto;

import com.hospital.model.Appointment;
import java.time.LocalDateTime;

public class AppointmentResponse {
    private Long id;
    private String patientName;
    private String doctorName;
    private String doctorSpecialization;
    private LocalDateTime appointmentDateTime;
    private String status;
    private String notes;
    
    public AppointmentResponse(Appointment appointment) {
        this.id = appointment.getId();
        this.patientName = appointment.getPatient().getName();
        this.doctorName = appointment.getDoctor().getName();
        this.doctorSpecialization = appointment.getDoctor().getSpecialization();
        this.appointmentDateTime = appointment.getAppointmentDateTime();
        this.status = appointment.getStatus().toString();
        this.notes = appointment.getNotes();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    
    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
    
    public String getDoctorSpecialization() { return doctorSpecialization; }
    public void setDoctorSpecialization(String doctorSpecialization) { this.doctorSpecialization = doctorSpecialization; }
    
    public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}