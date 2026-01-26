package com.hospital.repository;

import com.hospital.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialization(String specialization);
    
    @Query("SELECT d FROM Doctor d WHERE d.id NOT IN " +
           "(SELECT a.doctor.id FROM Appointment a WHERE a.appointmentDateTime = :dateTime AND a.status = 'SCHEDULED')")
    List<Doctor> findAvailableDoctors(@Param("dateTime") LocalDateTime dateTime);
}