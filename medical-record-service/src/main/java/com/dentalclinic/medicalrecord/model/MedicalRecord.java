package com.dentalclinic.medicalrecord.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "medical_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID patientId;
    private UUID appointmentId;
    private String diagnosis;
    private String treatment;
    private String prescription;
    private String recommendation;
    private String notes;
    private LocalDateTime createdAt;
}
