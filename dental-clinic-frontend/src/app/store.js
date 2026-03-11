import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from '../features/doctorsSlice';
import patientsReducer from '../features/patientsSlice';
import appointmentsReducer from '../features/appointmentsSlice';
import medicalRecordsReducer from '../features/medicalRecordsSlice';

export const store = configureStore({
    reducer: {
        doctors: doctorsReducer,
        patients: patientsReducer,
        appointments: appointmentsReducer,
        medicalRecords: medicalRecordsReducer,
    },
});
