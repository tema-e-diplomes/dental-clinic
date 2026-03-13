import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, addDoctor, updateDoctor, deleteDoctor } from '../features/doctorsSlice';
import { Plus, Search, UserRound, Mail, Phone, MapPin, Trash2, Pencil } from 'lucide-react';

const Doctors = () => {
    const dispatch = useDispatch();
    const { items: doctors, status } = useSelector((state) => state.doctors);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDoctorId, setCurrentDoctorId] = useState(null);
    const [newDoctor, setNewDoctor] = useState({ firstName: '', lastName: '', specialty: '', licenseNumber: '', email: '' });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchDoctors());
        }
    }, [status, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateDoctor({ id: currentDoctorId, doctor: newDoctor }));
        } else {
            dispatch(addDoctor(newDoctor));
        }
        closeModal();
    };

    const handleEdit = (doctor) => {
        setNewDoctor({
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            specialty: doctor.specialty,
            licenseNumber: doctor.licenseNumber,
            email: doctor.email
        });
        setCurrentDoctorId(doctor.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            dispatch(deleteDoctor(id));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewDoctor({ firstName: '', lastName: '', specialty: '', licenseNumber: '', email: '' });
        setCurrentDoctorId(null);
    };

    return (
        <div className="doctors-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Doctors Management</h2>
                    <p className="text-muted">Manage your clinic's medical staff.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Add New Doctor
                </button>
            </div>

            <div className="doctors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="premium-card doctor-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div className="doctor-info-main" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="doctor-avatar" style={{ width: '50px', height: '50px', background: '#e0e7ff', color: '#4338ca', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                                    <UserRound size={28} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Dr. {doctor.firstName} {doctor.lastName}</h4>
                                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{doctor.specialty}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <button className="icon-btn" onClick={() => handleEdit(doctor)} title="Edit">
                                    <Pencil size={18} />
                                </button>
                                <button className="icon-btn" style={{ color: 'var(--error)' }} onClick={() => handleDelete(doctor.id)} title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="doctor-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> {doctor.email || 'N/A'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> License: {doctor.licenseNumber || 'N/A'}</div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="premium-card modal-content" style={{ width: '100%', maxWidth: '500px' }}>
                        <h3>{isEditing ? 'Edit Doctor' : 'Add New Doctor'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    required
                                    value={newDoctor.firstName}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, firstName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                    value={newDoctor.lastName}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, lastName: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Specialty"
                                required
                                value={newDoctor.specialty}
                                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="License Number"
                                required
                                value={newDoctor.licenseNumber}
                                onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={newDoctor.email}
                                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                            />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-primary">{isEditing ? 'Save Changes' : 'Save Doctor'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Doctors;
