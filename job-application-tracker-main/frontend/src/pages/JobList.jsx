import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs, deleteJob } from '../services/api';
import './JobList.css'; 

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // NEW: Loading state

    const fetchJobs = () => {
        setLoading(true); // Set loading true before fetch
        getAllJobs()
            .then(res => {
                setJobs(res.data);
                setLoading(false); // Set loading false after fetch
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Also set false on error
            });
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            deleteJob(id)
                .then(() => {
                    fetchJobs(); // Refetch jobs
                })
                .catch(console.error);
        }
    };

    // NEW: Show loading message
    if (loading) {
        return <div className="loading-message">Loading applications...</div>;
    }

    return (
        <div className="job-list-container">
            <h2>Dashboard</h2>
            
            <div className="job-cards-grid">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="job-card">
                            <div className="card-header">
                                <h3>{job.title}</h3>
                                <p className={`status status-${job.status.toLowerCase()}`}>{job.status}</p>
                            </div>
                            <p className="card-company">{job.company}</p>
                            <p className="card-date">Applied: {new Date(job.date).toLocaleDateString('en-GB')}</p>
                            
                            <div className="card-actions">
                                <Link to={`/jobs/${job._id}`} className="button-view">View</Link>
                                <Link to={`/jobs/${job._id}/edit`} className="button-edit">Edit</Link>
                                <button onClick={() => handleDelete(job._id)} className="button-delete">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    // NEW: Nicer empty state
                    <div className="empty-state">
                        <h3>No applications found</h3>
                        <p>Get started by adding your first job application.</p>
                        <Link to="/jobs/new" className="button">Add New Application</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobList;