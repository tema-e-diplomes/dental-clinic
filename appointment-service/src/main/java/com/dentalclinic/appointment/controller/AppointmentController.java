package com.dentalclinic.appointment.controller;

import com.dentalclinic.appointment.dto.AppointmentRequestDTO;
import com.dentalclinic.appointment.dto.AppointmentResponseDTO;
import com.dentalclinic.appointment.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public AppointmentResponseDTO getAppointmentById(@PathVariable UUID id) {
        return appointmentService.getAppointmentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponseDTO createAppointment(@Valid @RequestBody AppointmentRequestDTO requestDTO) {
        return appointmentService.createAppointment(requestDTO);
    }

    @PatchMapping("/{id}/status")
    public AppointmentResponseDTO updateStatus(@PathVariable UUID id, @RequestParam String status) {
        return appointmentService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable UUID id) {
        appointmentService.deleteAppointment(id);
    }
}
