import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/api';
import './JobDetails.css'; 

function JobDetails() {
    const [job, setJob] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getJobById(id)
            .then(res => setJob(res.data))
            .catch(console.error);
    }, [id]);

    // Updated loading state
    if (!job) {
        return <div className="loading-message">Loading job details...</div>;
    }

    return (
        <div className="details-container">
            <div className="details-header">
                <h2>{job.title}</h2>
                <p className={`status status-${job.status.toLowerCase()}`}>{job.status}</p>
            </div>
            
            <div className="details-body">
                <p className="detail-item">
                    {/* SVG Icon for Company */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    <strong>Company:</strong> {job.company}
                </p>
                <p className="detail-item">
                    {/* SVG Icon for Date Applied */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <strong>Date Applied:</strong> {new Date(job.date).toLocaleDateString('en-GB')}
                </p>
                <p className="detail-item">
                    {/* SVG Icon for Last Updated */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                    <strong>Last Updated:</strong> {new Date(job.updatedAt).toLocaleString()}
                </p>
            </div>
            
            <div className="details-actions">
                <Link to={`/jobs/${job._id}/edit`} className="button-edit">Edit</Link>
                <Link to="/" className="button-back">
                    {/* SVG Icon for Back */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default JobDetails;