import { Schema, model } from 'mongoose';

const payrollSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        startdate: {
            type: Date,
            required: true
        },
        notes: {
            type: String,
            required: true
        },
        admin_id: {
            type: String,
            required: true
        },
        adminemail: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Employees', payrollSchema);
