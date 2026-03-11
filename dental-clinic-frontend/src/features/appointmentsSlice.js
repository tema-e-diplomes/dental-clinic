import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
    const response = await api.get('/appointment');
    return response.data;
});

export const createAppointment = createAsyncThunk('appointments/createAppointment', async (appointment) => {
    const response = await api.post('/appointment', appointment);
    return response.data;
});

export const updateAppointmentStatus = createAsyncThunk('appointments/updateStatus', async ({ id, status }) => {
    const response = await api.patch(`/appointment/${id}/status?status=${status}`);
    return response.data;
});

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (id) => {
    await api.delete(`/appointment/${id}`);
    return id;
});

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.items = state.items.filter(a => a.id !== action.payload);
            });
    },
});

export default appointmentsSlice.reducer;
