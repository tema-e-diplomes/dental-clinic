package com.dentalclinic.medicalrecord.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordRequestDTO {
    @NotNull(message = "Patient ID is mandatory")
    private UUID patientId;

    @NotBlank(message = "Diagnosis is mandatory")
    private String diagnosis;

    @NotBlank(message = "Treatment is mandatory")
    private String treatment;

    private String notes;
}
