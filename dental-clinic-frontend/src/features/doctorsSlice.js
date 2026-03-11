import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
    const response = await api.get('/doctor');
    return response.data;
});

export const addDoctor = createAsyncThunk('doctors/addDoctor', async (doctor) => {
    const response = await api.post('/doctor', doctor);
    return response.data;
});

export const updateDoctor = createAsyncThunk('doctors/updateDoctor', async ({ id, doctor }) => {
    const response = await api.put(`/doctor/${id}`, doctor);
    return response.data;
});

export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (id) => {
    await api.delete(`/doctor/${id}`);
    return id;
});

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                const index = state.items.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.items = state.items.filter(d => d.id !== action.payload);
            });
    },
});

export default doctorsSlice.reducer;
