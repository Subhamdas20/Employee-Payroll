import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        firstname: {type: String},
        lastname: {type: String},
        gender: { type: String },
        department: { type: String },
        salary: { type: Number },
        startdate: { type: Date },
        notes: { type: String },
        admin_id:{ type: String },
        adminemail :{ type: String },
    },
    {
        timestamps: true
    }
);

export default model('Employees', userSchema);
