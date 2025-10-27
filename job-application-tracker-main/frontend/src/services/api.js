import axios from 'axios';

const api = axios.create({
    baseURL: 'https://job-application-tracker-q80u.onrender.com/api'
});

export const createJob = (jobData) => api.post('/jobs', jobData);
export const getAllJobs = () => api.get('/jobs');
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);