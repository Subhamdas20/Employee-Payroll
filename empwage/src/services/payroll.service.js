import Emp from '../models/payroll.model';

export const addEmployee = async (req, res) => {
    let newEmp = new Emp({
        firstname: req.firstname,
        lastname: req.lastname,
        gender: req.gender,
        department: req.department,
        salary: req.salary,
        startdate: req.startdate,
        notes: req.notes
    })
    return await newEmp.save()
};