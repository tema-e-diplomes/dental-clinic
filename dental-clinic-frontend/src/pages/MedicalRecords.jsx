import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicalRecords, addMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from '../features/medicalRecordsSlice';
import { fetchPatients } from '../features/patientsSlice';
import { FileText, Plus, Search, User, Clipboard, FileType, Calendar, Pencil, Trash2 } from 'lucide-react';

const MedicalRecords = () => {
    const dispatch = useDispatch();
    const { items: records, status } = useSelector((state) => state.medicalRecords);
    const { items: patients } = useSelector((state) => state.patients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecordId, setCurrentRecordId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newRecord, setNewRecord] = useState({
        patientId: '',
        diagnosis: '',
        treatment: '',
        notes: ''
    });

    useEffect(() => {
        dispatch(fetchMedicalRecords());
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateMedicalRecord({ id: currentRecordId, record: newRecord }));
        } else {
            dispatch(addMedicalRecord(newRecord));
        }
        closeModal();
    };

    const handleEdit = (record) => {
        setNewRecord({
            patientId: record.patientId,
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            notes: record.notes || ''
        });
        setCurrentRecordId(record.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this medical record?')) {
            dispatch(deleteMedicalRecord(id));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewRecord({ patientId: '', diagnosis: '', treatment: '', notes: '' });
        setCurrentRecordId(null);
    };

    const getPatientName = (id) => {
        const patient = patients.find(p => p.id === id);
        return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
    };

    const filteredRecords = records.filter(record =>
        getPatientName(record.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="medical-records-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Medical Records</h2>
                    <p className="text-muted">Clinical documentation and patient history.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="search-bar" style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            style={{ paddingLeft: '38px', width: '300px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} /> New Record
                    </button>
                </div>
            </div>

            <div className="records-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredRecords.map((record) => (
                    <div key={record.id} className="premium-card record-item" style={{ borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div className="patient-icon" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>{getPatientName(record.patientId)}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                        {new Date(record.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <button className="icon-btn" onClick={() => handleEdit(record)} title="Edit">
                                    <Pencil size={18} />
                                </button>
                                <button className="icon-btn" style={{ color: 'var(--error)' }} onClick={() => handleDelete(record.id)} title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="record-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '0.5rem' }}>
                            <div className="diagnosis">
                                <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                    <Clipboard size={14} style={{ display: 'inline', marginRight: '6px' }} /> Diagnosis
                                </h5>
                                <p style={{ margin: 0 }}>{record.diagnosis}</p>
                            </div>
                            <div className="treatment">
                                <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                    <FileType size={14} style={{ display: 'inline', marginRight: '6px' }} /> Treatment
                                </h5>
                                <p style={{ margin: 0 }}>{record.treatment}</p>
                            </div>
                        </div>

                        {record.notes && (
                            <div className="notes" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.9rem' }}>
                                <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Special Notes</h5>
                                <p style={{ margin: 0, fontStyle: 'italic' }}>{record.notes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="premium-card modal-content" style={{ width: '100%', maxWidth: '600px' }}>
                        <h3>{isEditing ? 'Edit Medical Record' : 'Add Medical Record'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Patient</label>
                                <select
                                    required
                                    value={newRecord.patientId}
                                    onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
                                    disabled={isEditing}
                                >
                                    <option value="">Select Patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Diagnosis</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Chronic gingivitis"
                                    value={newRecord.diagnosis}
                                    onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Treatment Plan</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Scaling and root planing"
                                    value={newRecord.treatment}
                                    onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Clinical Notes</label>
                                <textarea
                                    placeholder="Additional observations..."
                                    value={newRecord.notes}
                                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                                    style={{ width: '100%', minHeight: '100px', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-primary">{isEditing ? 'Save Changes' : 'Save Record'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecords;
