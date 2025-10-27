const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
        minlength: [3, 'Company name must be at least 3 characters long'],
        maxLength: [50, 'Company name cannot exceed 50 characters'] // NEW
    },
    title: {
        type: String,
        required: [true, 'Job title is required'],
        maxLength: [100, 'Job title cannot exceed 100 characters'] // NEW
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
        required: [true, 'Status is required'] // NEW
    },
    date: {
        type: Date,
        required: [true, 'Application date is required'],
        validate: {
            validator: function(v) {
                return v <= new Date();
            },
            message: 'Application date cannot be in the future'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);