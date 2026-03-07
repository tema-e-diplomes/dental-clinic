package com.dentalclinic.medicalrecord.service;

import com.dentalclinic.medicalrecord.client.PatientClient;
import com.dentalclinic.medicalrecord.dto.MedicalRecordRequestDTO;
import com.dentalclinic.medicalrecord.dto.MedicalRecordResponseDTO;
import com.dentalclinic.medicalrecord.model.MedicalRecord;
import com.dentalclinic.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientClient patientClient;

    public List<MedicalRecordResponseDTO> getAllRecords() {
        return medicalRecordRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<MedicalRecordResponseDTO> getRecordsByPatientId(UUID patientId) {
        return medicalRecordRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public MedicalRecordResponseDTO getRecordById(UUID id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found"));
        return mapToResponseDTO(record);
    }

    public MedicalRecordResponseDTO createRecord(MedicalRecordRequestDTO requestDTO) {
        // Validate patient exists
        patientClient.getPatientById(requestDTO.getPatientId());

        MedicalRecord record = MedicalRecord.builder()
                .patientId(requestDTO.getPatientId())
                .diagnosis(requestDTO.getDiagnosis())
                .treatment(requestDTO.getTreatment())
                .notes(requestDTO.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        return mapToResponseDTO(medicalRecordRepository.save(record));
    }

    private MedicalRecordResponseDTO mapToResponseDTO(MedicalRecord record) {
        return MedicalRecordResponseDTO.builder()
                .id(record.getId())
                .patientId(record.getPatientId())
                .diagnosis(record.getDiagnosis())
                .treatment(record.getTreatment())
                .notes(record.getNotes())
                .createdAt(record.getCreatedAt())
                .build();
    }
}
