const Job = require('../models/job.model');

const formatErrors = (err) => {
    const errors = {};
    for (const key in err.errors) {
        errors[key] = err.errors[key].message;
    }
    return errors;
};


exports.createJob = async (req, res) => {
    try {
        const newJob = await Job.create(req.body);
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json(formatErrors(err));
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find().sort({ date: -1 });
        res.status(200).json(allJobs);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedJob) {
            return res.status(4404).json({ message: 'Job not found' });
        }
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(400).json(formatErrors(err));
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(4404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};