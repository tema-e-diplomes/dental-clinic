package com.dentalclinic.patient.service;

import com.dentalclinic.patient.dto.PatientRequestDTO;
import com.dentalclinic.patient.dto.PatientResponseDTO;
import com.dentalclinic.patient.model.Patient;
import com.dentalclinic.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public List<PatientResponseDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public PatientResponseDTO getPatientById(UUID id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return mapToResponseDTO(patient);
    }

    public PatientResponseDTO createPatient(PatientRequestDTO requestDTO) {
        Patient patient = Patient.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .dateOfBirth(requestDTO.getDateOfBirth())
                .gender(requestDTO.getGender())
                .phone(requestDTO.getPhone())
                .email(requestDTO.getEmail())
                .build();
        return mapToResponseDTO(patientRepository.save(patient));
    }

    public PatientResponseDTO updatePatient(UUID id, PatientRequestDTO requestDTO) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setFirstName(requestDTO.getFirstName());
        patient.setLastName(requestDTO.getLastName());
        patient.setDateOfBirth(requestDTO.getDateOfBirth());
        patient.setGender(requestDTO.getGender());
        patient.setPhone(requestDTO.getPhone());
        patient.setEmail(requestDTO.getEmail());
        return mapToResponseDTO(patientRepository.save(patient));
    }

    public void deletePatient(UUID id) {
        patientRepository.deleteById(id);
    }

    private PatientResponseDTO mapToResponseDTO(Patient patient) {
        return PatientResponseDTO.builder()
                .id(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender())
                .phone(patient.getPhone())
                .email(patient.getEmail())
                .build();
    }
}
