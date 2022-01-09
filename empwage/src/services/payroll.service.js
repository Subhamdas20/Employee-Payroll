import Emp from '../models/payroll.model';

export const addEmployee = async (req, res) => {
    let userData = await User.find({ email: req.email });
    if (!userData.length) {
      let newEmp = new Emp({
        firstname: req.firstname,
        lastname: req.lastname,
        gender: req.gender,
        department: req.department,
        salary: req.salary,
        startdate: req.startdate,
        notes: re.notes
      })
      return await newEmp.save()
    }
  };