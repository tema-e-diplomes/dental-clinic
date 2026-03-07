package com.dentalclinic.appointment.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class AppointmentRequestDTO {
    @NotNull(message = "Patient ID is mandatory")
    private UUID patientId;

    @NotNull(message = "Doctor ID is mandatory")
    private UUID doctorId;

    @NotNull(message = "Appointment time is mandatory")
    @Future(message = "Appointment time should be in the future")
    private LocalDateTime appointmentTime;

    @NotBlank(message = "Reason is mandatory")
    private String reason;
}
