import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const fetchMedicalRecords = createAsyncThunk('medicalRecords/fetchMedicalRecords', async () => {
    const response = await api.get('/medical-record');
    return response.data;
});

export const fetchPatientRecords = createAsyncThunk('medicalRecords/fetchPatientRecords', async (patientId) => {
    const response = await api.get(`/medical-record/patient/${patientId}`);
    return response.data;
});

export const addMedicalRecord = createAsyncThunk('medicalRecords/addMedicalRecord', async (record) => {
    const response = await api.post('/medical-record', record);
    return response.data;
});

export const updateMedicalRecord = createAsyncThunk('medicalRecords/updateMedicalRecord', async ({ id, record }) => {
    const response = await api.put(`/medical-record/${id}`, record);
    return response.data;
});

export const deleteMedicalRecord = createAsyncThunk('medicalRecords/deleteMedicalRecord', async (id) => {
    await api.delete(`/medical-record/${id}`);
    return id;
});

const medicalRecordsSlice = createSlice({
    name: 'medicalRecords',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicalRecords.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchMedicalRecords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPatientRecords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addMedicalRecord.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateMedicalRecord.fulfilled, (state, action) => {
                const index = state.items.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
                state.items = state.items.filter(r => r.id !== action.payload);
            });
    },
});

export default medicalRecordsSlice.reducer;
