package com.dentalclinic.appointment.dto;

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
public class AppointmentResponseDTO {
    private UUID id;
    private UUID patientId;
    private UUID doctorId;
    private LocalDateTime appointmentTime;
    private String reason;
    private String status;
}
