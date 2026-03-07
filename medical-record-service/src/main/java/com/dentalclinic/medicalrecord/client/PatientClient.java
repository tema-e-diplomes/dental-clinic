package com.dentalclinic.medicalrecord.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "patient-service")
public interface PatientClient {
    @GetMapping("/patient/{id}")
    Object getPatientById(@PathVariable("id") UUID id);
}
