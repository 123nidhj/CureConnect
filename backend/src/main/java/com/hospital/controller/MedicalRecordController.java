package com.hospital.controller;

import com.hospital.model.MedicalRecord;
import com.hospital.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {
    
    @Autowired
    private MedicalRecordService medicalRecordService;
    
    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(@PathVariable Long id) {
        return medicalRecordService.getMedicalRecordById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getMedicalRecordsByPatient(@PathVariable Long patientId) {
        return medicalRecordService.getMedicalRecordsByPatient(patientId);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public List<MedicalRecord> getMedicalRecordsByDoctor(@PathVariable Long doctorId) {
        return medicalRecordService.getMedicalRecordsByDoctor(doctorId);
    }
    
    @PostMapping
    public MedicalRecord createMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.saveMedicalRecord(medicalRecord);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(@PathVariable Long id, @RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.getMedicalRecordById(id)
            .map(existingRecord -> {
                medicalRecord.setId(id);
                return ResponseEntity.ok(medicalRecordService.saveMedicalRecord(medicalRecord));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        if (medicalRecordService.getMedicalRecordById(id).isPresent()) {
            medicalRecordService.deleteMedicalRecord(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}