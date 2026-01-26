package com.hospital.controller;

import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.dto.AppointmentResponse;
import com.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;
    
    @GetMapping
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentService.getAllAppointments().stream()
                .map(AppointmentResponse::new)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
            .map(appointment -> ResponseEntity.ok(new AppointmentResponse(appointment)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/patient/{patientId}")
    public List<AppointmentResponse> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId).stream()
                .map(AppointmentResponse::new)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentResponse> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId).stream()
                .map(AppointmentResponse::new)
                .collect(Collectors.toList());
    }
    
    @PostMapping
    public ResponseEntity<AppointmentResponse> bookAppointment(@RequestBody AppointmentRequest request) {
        try {
            Appointment appointment = appointmentService.bookAppointment(
                request.getPatientId(),
                request.getDoctorId(),
                request.getAppointmentDateTime(),
                request.getNotes()
            );
            return ResponseEntity.ok(new AppointmentResponse(appointment));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateAppointmentStatus(
            @PathVariable Long id, 
            @RequestBody StatusUpdateRequest request) {
        try {
            Appointment appointment = appointmentService.updateAppointmentStatus(id, request.getStatus());
            return ResponseEntity.ok(new AppointmentResponse(appointment));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        try {
            appointmentService.cancelAppointment(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/available-doctors")
    public List<Doctor> getAvailableDoctors(@RequestParam String dateTime) {
        LocalDateTime appointmentDateTime = LocalDateTime.parse(dateTime);
        return appointmentService.getAvailableDoctors(appointmentDateTime);
    }
    
    // Inner classes for request bodies
    public static class AppointmentRequest {
        private Long patientId;
        private Long doctorId;
        private LocalDateTime appointmentDateTime;
        private String notes;
        
        // Getters and setters
        public Long getPatientId() { return patientId; }
        public void setPatientId(Long patientId) { this.patientId = patientId; }
        
        public Long getDoctorId() { return doctorId; }
        public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
        
        public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
        public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }
        
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }
    
    public static class StatusUpdateRequest {
        private Appointment.AppointmentStatus status;
        
        public Appointment.AppointmentStatus getStatus() { return status; }
        public void setStatus(Appointment.AppointmentStatus status) { this.status = status; }
    }
}