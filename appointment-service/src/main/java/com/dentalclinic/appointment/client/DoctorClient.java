package com.dentalclinic.appointment.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "doctor-service", url = "${DOCTOR_SERVICE_URL:http://doctor-service:8081}")
public interface DoctorClient {
    @GetMapping("/doctor/{id}")
    Object getDoctorById(@PathVariable("id") UUID id);
}
