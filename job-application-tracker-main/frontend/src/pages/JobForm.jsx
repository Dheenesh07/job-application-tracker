import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../services/api';
import './JobForm.css';

function JobForm() {
    const [job, setJob] = useState({
        company: '',
        title: '',
        date: '',
        status: 'Applied'
    });
    
    const [apiErrors, setApiErrors] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // NEW: Get today's date in YYYY-MM-DD format for the 'max' attribute
    const today = new Date().toISOString().split('T')[0];

    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const isEditing = Boolean(id); 

    useEffect(() => {
        if (isEditing) {
            getJobById(id)
                .then(res => {
                    const formattedDate = new Date(res.data.date).toISOString().split('T')[0];
                    setJob({ ...res.data, date: formattedDate });
                })
                .catch(console.error);
        } else {
            setJob(prev => ({ 
                ...prev, 
                date: today
            }));
        }
    }, [id, isEditing, today]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prev => ({ ...prev, [name]: value }));
        
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
        if (apiErrors[name]) setApiErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!job.company) newErrors.company = 'Company name is required';
        else if (job.company.length < 3) newErrors.company = 'Company name must be at least 3 characters';
        if (!job.title) newErrors.title = 'Job title is required';
        if (!job.date) newErrors.date = 'Application date is required';
        else if (new Date(job.date) > new Date()) newErrors.date = 'Application date cannot be in the future';
        if (!job.status) newErrors.status = 'Status is required'; // NEW
        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setApiErrors({}); 
        
        if (!validateForm()) return; 
        setIsSubmitting(true); 

        try {
            if (isEditing) {
                await updateJob(id, job);
            } else {
                await createJob(job);
            }
            navigate('/'); 
        } catch (err) {
            if (err.response && err.response.data) {
                setApiErrors(err.response.data);
            } else {
                console.error(err);
            }
            setIsSubmitting(false); 
        }
    };

    const hasError = (field) => formErrors[field] || apiErrors[field];

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Edit Job Application' : 'Add New Job Application'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="company" className="required">Company Name</label>
                    <input 
                        id="company"
                        type="text" 
                        name="company" 
                        value={job.company} 
                        onChange={handleChange}
                        className={hasError('company') ? 'input-error' : ''}
                        required         // NEW
                        maxLength={50}   // NEW
                    />
                    {hasError('company') && <p className="error-text">{formErrors.company || apiErrors.company}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="title" className="required">Job Title</label>
                    <input 
                        id="title"
                        type="text" 
                        name="title" 
                        value={job.title} 
                        onChange={handleChange} 
                        className={hasError('title') ? 'input-error' : ''}
                        required         // NEW
                        maxLength={100}  // NEW
                    />
                    {hasError('title') && <p className="error-text">{formErrors.title || apiErrors.title}</p>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date" className="required">Application Date</label>
                        <input 
                            id="date"
                            type="date" 
                            name="date" 
                            value={job.date} 
                            onChange={handleChange} 
                            className={hasError('date') ? 'input-error' : ''}
                            required   // NEW
                            max={today}  // NEW: Prevents future dates
                        />
                        {hasError('date') && <p className="error-text">{formErrors.date || apiErrors.date}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" className="required">Status</label>
                        <select 
                            id="status" 
                            name="status" 
                            value={job.status} 
                            onChange={handleChange}
                            required   // NEW
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        {hasError('status') && <p className="error-text">{formErrors.status || apiErrors.status}</p>}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="button" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (isEditing ? 'Update Application' : 'Create Application')}
                    </button>
                    <Link to="/" className="button-back">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default JobForm;