const JobController = require('../controllers/job.controller');

module.exports = (app) => {
    // C - Create
    app.post('/api/jobs', JobController.createJob);

    // R - Read All
    app.get('/api/jobs', JobController.getAllJobs);

    // R - Read One
    app.get('/api/jobs/:id', JobController.getJobById);

    // U - Update
    app.put('/api/jobs/:id', JobController.updateJob);

    // D - Delete
    app.delete('/api/jobs/:id', JobController.deleteJob);
};