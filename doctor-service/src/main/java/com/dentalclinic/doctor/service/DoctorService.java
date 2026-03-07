package com.dentalclinic.doctor.service;

import com.dentalclinic.doctor.dto.DoctorRequestDTO;
import com.dentalclinic.doctor.dto.DoctorResponseDTO;
import com.dentalclinic.doctor.model.Doctor;
import com.dentalclinic.doctor.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public List<DoctorResponseDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public DoctorResponseDTO getDoctorById(UUID id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return mapToResponseDTO(doctor);
    }

    public DoctorResponseDTO createDoctor(DoctorRequestDTO requestDTO) {
        Doctor doctor = Doctor.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .specialty(requestDTO.getSpecialty())
                .licenseNumber(requestDTO.getLicenseNumber())
                .email(requestDTO.getEmail())
                .build();
        return mapToResponseDTO(doctorRepository.save(doctor));
    }

    public DoctorResponseDTO updateDoctor(UUID id, DoctorRequestDTO requestDTO) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setFirstName(requestDTO.getFirstName());
        doctor.setLastName(requestDTO.getLastName());
        doctor.setSpecialty(requestDTO.getSpecialty());
        doctor.setLicenseNumber(requestDTO.getLicenseNumber());
        doctor.setEmail(requestDTO.getEmail());
        return mapToResponseDTO(doctorRepository.save(doctor));
    }

    public void deleteDoctor(UUID id) {
        doctorRepository.deleteById(id);
    }

    private DoctorResponseDTO mapToResponseDTO(Doctor doctor) {
        return DoctorResponseDTO.builder()
                .id(doctor.getId())
                .firstName(doctor.getFirstName())
                .lastName(doctor.getLastName())
                .specialty(doctor.getSpecialty())
                .licenseNumber(doctor.getLicenseNumber())
                .email(doctor.getEmail())
                .build();
    }
}
