package com.dentalclinic.doctor.controller;

import com.dentalclinic.doctor.dto.DoctorRequestDTO;
import com.dentalclinic.doctor.dto.DoctorResponseDTO;
import com.dentalclinic.doctor.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public List<DoctorResponseDTO> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public DoctorResponseDTO getDoctorById(@PathVariable UUID id) {
        return doctorService.getDoctorById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorResponseDTO createDoctor(@Valid @RequestBody DoctorRequestDTO doctorRequestDTO) {
        return doctorService.createDoctor(doctorRequestDTO);
    }

    @PutMapping("/{id}")
    public DoctorResponseDTO updateDoctor(@PathVariable UUID id,
            @Valid @RequestBody DoctorRequestDTO doctorRequestDTO) {
        return doctorService.updateDoctor(id, doctorRequestDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDoctor(@PathVariable UUID id) {
        doctorService.deleteDoctor(id);
    }
}
