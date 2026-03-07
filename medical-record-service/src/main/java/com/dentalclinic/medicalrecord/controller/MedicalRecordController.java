package com.dentalclinic.medicalrecord.controller;

import com.dentalclinic.medicalrecord.dto.MedicalRecordRequestDTO;
import com.dentalclinic.medicalrecord.dto.MedicalRecordResponseDTO;
import com.dentalclinic.medicalrecord.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medical-record")
@RequiredArgsConstructor
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    @GetMapping
    public List<MedicalRecordResponseDTO> getAllRecords() {
        return medicalRecordService.getAllRecords();
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecordResponseDTO> getRecordsByPatientId(@PathVariable UUID patientId) {
        return medicalRecordService.getRecordsByPatientId(patientId);
    }

    @GetMapping("/{id}")
    public MedicalRecordResponseDTO getRecordById(@PathVariable UUID id) {
        return medicalRecordService.getRecordById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicalRecordResponseDTO createRecord(@Valid @RequestBody MedicalRecordRequestDTO requestDTO) {
        return medicalRecordService.createRecord(requestDTO);
    }
}
