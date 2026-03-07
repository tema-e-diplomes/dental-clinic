package com.dentalclinic.appointment.service;

import com.dentalclinic.appointment.client.DoctorClient;
import com.dentalclinic.appointment.client.PatientClient;
import com.dentalclinic.appointment.dto.AppointmentRequestDTO;
import com.dentalclinic.appointment.dto.AppointmentResponseDTO;
import com.dentalclinic.appointment.model.Appointment;
import com.dentalclinic.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public AppointmentResponseDTO getAppointmentById(UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return mapToResponseDTO(appointment);
    }

    public AppointmentResponseDTO createAppointment(AppointmentRequestDTO requestDTO) {
        // Validate doctor and patient exist
        doctorClient.getDoctorById(requestDTO.getDoctorId());
        patientClient.getPatientById(requestDTO.getPatientId());

        Appointment appointment = Appointment.builder()
                .patientId(requestDTO.getPatientId())
                .doctorId(requestDTO.getDoctorId())
                .appointmentTime(requestDTO.getAppointmentTime())
                .reason(requestDTO.getReason())
                .status("SCHEDULED")
                .build();
        return mapToResponseDTO(appointmentRepository.save(appointment));
    }

    public AppointmentResponseDTO updateStatus(UUID id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return mapToResponseDTO(appointmentRepository.save(appointment));
    }

    public void deleteAppointment(UUID id) {
        appointmentRepository.deleteById(id);
    }

    private AppointmentResponseDTO mapToResponseDTO(Appointment appointment) {
        return AppointmentResponseDTO.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatientId())
                .doctorId(appointment.getDoctorId())
                .appointmentTime(appointment.getAppointmentTime())
                .reason(appointment.getReason())
                .status(appointment.getStatus())
                .build();
    }
}
