package com.dentalclinic.patient.controller;

import com.dentalclinic.patient.dto.PatientRequestDTO;
import com.dentalclinic.patient.dto.PatientResponseDTO;
import com.dentalclinic.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @GetMapping
    public List<PatientResponseDTO> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientResponseDTO getPatientById(@PathVariable UUID id) {
        return patientService.getPatientById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponseDTO createPatient(@Valid @RequestBody PatientRequestDTO requestDTO) {
        return patientService.createPatient(requestDTO);
    }

    @PutMapping("/{id}")
    public PatientResponseDTO updatePatient(@PathVariable UUID id, @Valid @RequestBody PatientRequestDTO requestDTO) {
        return patientService.updatePatient(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePatient(@PathVariable UUID id) {
        patientService.deletePatient(id);
    }
}
