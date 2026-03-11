import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    const response = await api.get('/patient');
    return response.data;
});

export const addPatient = createAsyncThunk('patients/addPatient', async (patient) => {
    const response = await api.post('/patient', patient);
    return response.data;
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async ({ id, patient }) => {
    const response = await api.put(`/patient/${id}`, patient);
    return response.data;
});

export const deletePatient = createAsyncThunk('patients/deletePatient', async (id) => {
    await api.delete(`/patient/${id}`);
    return id;
});

const patientsSlice = createSlice({
    name: 'patients',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            });
    },
});

export default patientsSlice.reducer;
