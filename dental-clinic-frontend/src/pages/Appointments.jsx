import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } from '../features/appointmentsSlice';
import { fetchDoctors } from '../features/doctorsSlice';
import { fetchPatients } from '../features/patientsSlice';
import { Plus, Calendar, Clock, User, UserSquare, MoreVertical, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const Appointments = () => {
    const dispatch = useDispatch();
    const { items: appointments, status } = useSelector((state) => state.appointments);
    const { items: doctors } = useSelector((state) => state.doctors);
    const { items: patients } = useSelector((state) => state.patients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        patientId: '',
        doctorId: '',
        appointmentTime: '',
        reason: ''
    });

    useEffect(() => {
        dispatch(fetchAppointments());
        dispatch(fetchDoctors());
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAppointment(newAppointment));
        setIsModalOpen(false);
        setNewAppointment({ patientId: '', doctorId: '', appointmentTime: '', reason: '' });
    };

    const handleStatusUpdate = (id, newStatus) => {
        dispatch(updateAppointmentStatus({ id, status: newStatus }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            dispatch(deleteAppointment(id));
        }
    };

    const getPatientName = (id) => {
        const patient = patients.find(p => p.id === id);
        return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
    };

    const getDoctorName = (id) => {
        const doctor = doctors.find(d => d.id === id);
        return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
    };

    const formatDateTime = (dateTimeStr) => {
        return new Date(dateTimeStr).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    };

    return (
        <div className="appointments-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Appointments</h2>
                    <p className="text-muted">Schedule and manage patient visits.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Schedule Appointment
                </button>
            </div>

            <div className="appointments-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="premium-card appointment-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div className="status-badge">
                                <span className={`badge ${appointment.status === 'SCHEDULED' ? 'badge-primary' :
                                        appointment.status === 'COMPLETED' ? 'badge-success' : 'badge-danger'
                                    }`}>
                                    {appointment.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {appointment.status === 'SCHEDULED' && (
                                    <>
                                        <button className="icon-btn" style={{ color: 'var(--success)' }} onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')} title="Complete">
                                            <CheckCircle size={18} />
                                        </button>
                                        <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')} title="Cancel">
                                            <XCircle size={18} />
                                        </button>
                                    </>
                                )}
                                <button className="icon-btn" style={{ color: 'var(--text-muted)' }} onClick={() => handleDelete(appointment.id)} title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="appointment-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: 'var(--primary)' }}><Calendar size={18} /></div>
                                <span style={{ fontWeight: 500 }}>{formatDateTime(appointment.appointmentTime)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: 'var(--text-muted)' }}><User size={18} /></div>
                                <span>{getPatientName(appointment.patientId)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ color: 'var(--text-muted)' }}><UserSquare size={18} /></div>
                                <span>{getDoctorName(appointment.doctorId)}</span>
                            </div>
                            <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.9rem' }}>
                                <strong style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Reason</strong>
                                {appointment.reason}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="premium-card modal-content" style={{ width: '100%', maxWidth: '500px' }}>
                        <h3>Schedule Appointment</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Patient</label>
                                <select
                                    required
                                    value={newAppointment.patientId}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                                >
                                    <option value="">Select Patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Doctor</label>
                                <select
                                    required
                                    value={newAppointment.doctorId}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map(d => (
                                        <option key={d.id} value={d.id}>Dr. {d.firstName} {d.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Appointment Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={newAppointment.appointmentTime}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Reason for Visit</label>
                                <textarea
                                    required
                                    placeholder="Routine checkup, toothache, etc."
                                    value={newAppointment.reason}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                    style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Schedule</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
