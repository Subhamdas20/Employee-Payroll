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
        admin_id: req.data.id,
        adminemail: req.data.email
    })
    return await newEmp.save()
};
export const getEmployee = async (req, res) => {
    let employeeData = await Emp.find({ admin_id: req.data.id });
    return employeeData;
};
export const deleteEmployee = async (req, res) => {
    let employeeData = await Emp.deleteOne({ admin_id: req.data.id, _id: req.id });
    return employeeData;
};

export const updateEmployee = async (req, res) => {
    let employeeData = await Emp.findOne({ admin_id: req.data.id, _id: req.id });
    if (employeeData) {
        let empModel = {
            firstname: req.firstname ? req.firstname : employeeData.firstname,
            lastname: req.lastname ? req.lastname : employeeData.lastname,
            gender: req.gender ? req.gender : employeeData.gender,
            department: req.department ? req.department : employeeData.department,
            salary: req.salary ? req.salary : employeeData.salary,
            startdate: req.startdate ? req.startdate : employeeData.startdate,
            notes: req.notes ? req.notes : employeeData.notes,
        }
       return Emp.updateOne({ admin_id: req.data.id, _id: req.id }, empModel)
    }
    else {
         return employeeData
    }
};
