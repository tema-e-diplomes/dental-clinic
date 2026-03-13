import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients, addPatient, updatePatient, deletePatient } from '../features/patientsSlice';
import { Plus, Search, User, Mail, Phone, Calendar, Hash, Pencil, Trash2 } from 'lucide-react';

const Patients = () => {
    const dispatch = useDispatch();
    const { items: patients, status } = useSelector((state) => state.patients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPatientId, setCurrentPatientId] = useState(null);
    const [filter, setFilter] = useState('');
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'OTHER',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPatients());
        }
    }, [status, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updatePatient({ id: currentPatientId, patient: newPatient }));
        } else {
            dispatch(addPatient(newPatient));
        }
        closeModal();
    };

    const handleEdit = (patient) => {
        setNewPatient({
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            phone: patient.phone,
            email: patient.email
        });
        setCurrentPatientId(patient.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            dispatch(deletePatient(id));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewPatient({ firstName: '', lastName: '', dateOfBirth: '', gender: 'OTHER', phone: '', email: '' });
        setCurrentPatientId(null);
    };

    const filteredPatients = patients.filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(filter.toLowerCase()) ||
        p.email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="patients-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Patients Management</h2>
                    <p className="text-muted">View and manage patient records and history.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="search-bar" style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            style={{ paddingLeft: '38px', width: '300px' }}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} /> Add New Patient
                    </button>
                </div>
            </div>

            <div className="patients-table-container premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <tr>
                            <th style={{ padding: '1.25rem' }}>Patient Name</th>
                            <th style={{ padding: '1.25rem' }}>Contact Info</th>
                            <th style={{ padding: '1.25rem' }}>Birth Date</th>
                            <th style={{ padding: '1.25rem' }}>Gender</th>
                            <th style={{ padding: '1.25rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div className="avatar-sm" style={{ width: '36px', height: '36px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={18} />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{patient.firstName} {patient.lastName}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={12} /> {patient.email}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={12} /> {patient.phone}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem', fontSize: '0.85rem' }}>{patient.dateOfBirth}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span className={`badge ${patient.gender === 'MALE' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '0.7rem' }}>
                                        {patient.gender}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <button className="icon-btn" onClick={() => handleEdit(patient)} title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        <button className="icon-btn" style={{ color: 'var(--error)' }} onClick={() => handleDelete(patient.id)} title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="premium-card modal-content" style={{ width: '100%', maxWidth: '600px' }}>
                        <h3>{isEditing ? 'Edit Patient' : 'Register New Patient'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>First Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John"
                                        value={newPatient.firstName}
                                        onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Doe"
                                        value={newPatient.lastName}
                                        onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Date of Birth</label>
                                    <input
                                        type="date"
                                        required
                                        value={newPatient.dateOfBirth}
                                        onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Gender</label>
                                    <select
                                        value={newPatient.gender}
                                        onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    value={newPatient.phone}
                                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john.doe@example.com"
                                    value={newPatient.email}
                                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-primary">{isEditing ? 'Save Changes' : 'Register Patient'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
