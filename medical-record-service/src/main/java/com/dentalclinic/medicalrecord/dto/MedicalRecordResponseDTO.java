package com.dentalclinic.medicalrecord.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordResponseDTO {
    private UUID id;
    private UUID patientId;
    private String diagnosis;
    private String treatment;
    private String notes;
    private LocalDateTime createdAt;
}
