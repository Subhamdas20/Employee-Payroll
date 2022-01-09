import Emp from '../models/payroll.model';

export const addEmployee = async (req, res) => {
    let newEmp = new Emp({
        firstname: req.firstname,
        lastname: req.lastname,
        gender: req.gender,
        department: req.department,
        salary: req.salary,
        startdate: req.startdate,
        notes: req.notes,
        admin_id:req.data.id,
        adminemail:req.data.email
    })
    return await newEmp.save()
};
export const addEmployee = async (req, res) => {
    let newEmp = new Emp({
        firstname: req.firstname,
        lastname: req.lastname,
        gender: req.gender,
        department: req.department,
        salary: req.salary,
        startdate: req.startdate,
        notes: req.notes,
        admin_id:req.data.id,
        adminemail:req.data.email
    })
    return await newEmp.save()
};