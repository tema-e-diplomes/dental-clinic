package com.dentalclinic.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorResponseDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String specialty;
    private String licenseNumber;
    private String email;
}
