import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs';
import app from '../../src/index';
import logger from '../../src/config/logger';


const rawdata = fs.readFileSync('tests/integration/userData.json');
const employeeJSON = JSON.parse(rawdata);
var jwToken = '';


describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    }

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      // clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    }
    else {
      // clearCollections();
    }

    done();
  });
})

describe('registration API', () => {
  it('if valid details recieved should save in db', (done) => {
    const userDetails = employeeJSON.UserData1;
    request(app)
      .post('/users/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User registered successfully');
        done();
      });
  })
  it('if invalid emailId recieved should not save in db', (done) => {
    const userDetails = employeeJSON.UserData2;
    request(app)
      .post('/users/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('\"email\" must be a valid email');
        done();
      });
  })
  it('if invalid firstName recieved should not save in db', (done) => {
    const userDetails = employeeJSON.UserData3;
    request(app)
      .post('/users/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('"firstname" is not allowed to be empty');
        done();
      });
  })
  it('if invalid lastName recieved should not save in db', (done) => {
    const userDetails = employeeJSON.UserData4;
    request(app)
      .post('/users/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('"lastname" is not allowed to be empty');
        done();
      });
  })
  it('if invalid password recieved should not save in db', (done) => {
    const userDetails = employeeJSON.UserData5;
    request(app)
      .post('/users/register')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('"password" is not allowed to be empty');
        done();
      });
  })
})

describe('Login API', () => {
  it('if valid details recieved should login', (done) => {
    const userDetails = employeeJSON.loginData1;
    request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User Login successfully');
        done();
      });
  })

  it('if invalid  mail details recieved should not login', (done) => {
    const userDetails = employeeJSON.loginData2;
    request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('"email" must be a valid email');
        done();
      });
  })

  it('if mail details not recieved should not login', (done) => {
    const userDetails = employeeJSON.loginData3;
    request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('"email" is not allowed to be empty');
        done();
      });
  })

  it('if invalid  password recieved should not login', (done) => {
    const userDetails = employeeJSON.loginData4;
    request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.message).to.be.equal('Email not found!! Register first');
        done();
      });
  })
  it('if password not recieved should not login', (done) => {
    const userDetails = employeeJSON.loginData5;
    request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500);
        expect(res.body.message).to.be.equal('\"password\" is not allowed to be empty');
        done();
      });
  })
})

describe('addEmployee API', () => {
  beforeEach((done) => {
    request(app)
      .post('/users/login')
      .send(employeeJSON.loginData1)
      .end((err, res) => {
        if (err) {
          done();
        }
        jwToken = res.body.data.token;
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User Login successfully');
        done();
      });
  });
  it('if valid token details recieved should addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData1;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(201)
        expect(res.body.message).to.be.equal(' Employee added successfully');
        done();
      });
  })
  it('if invalid token details recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData1;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: "sgsrf.set.eat" })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(401)
        expect(res.body.message).to.be.equal('UNAUTHORIZED');
        done();
      });
  })
  it('if invalid firstname  recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData2;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('\"firstname\" is not allowed to be empty');
        done();
      });
  })
  it('if invalid lastname recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData3;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('\"lastname\" is not allowed to be empty');
        done();
      });
  })
  it('if invalid gender recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData4;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('\"gender\" is not allowed to be empty');
        done();
      });
  })
  it('if invalid department recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData5;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('\"department\" is not allowed to be empty');
        done();
      });
  })
  it('if invalid salary recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData6;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('"salary" must be larger than or equal to 1');
        done();
      });
  })
  it('if invalid startdate recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData7;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('"startdate" must be in ISO 8601 date format');
        done();
      });
  })
  it('if invalid notes recieved should not addEmployee in db', (done) => {
    const userDetails = employeeJSON.addEmployeeData8;
    request(app)
      .post('/payroll/addEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(500)
        expect(res.body.message).to.be.equal('\"notes\" is not allowed to be empty');
        done();
      });
  })
})

describe('getEmployee API', () => {
  beforeEach((done) => {
    request(app)
      .post('/users/login')
      .send(employeeJSON.loginData1)
      .end((err, res) => {
        if (err) {
          done();
        }
        jwToken = res.body.data.token;
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User Login successfully');
        done();
      });
  });

  it('if valid token recieved should give status code 200', (done) => {
    const userDetails = employeeJSON.getEmployeeData;
    request(app)
      .get('/payroll/getEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' Employee records found');
        done();
      });
  })
  it('if invalid token recieved should give status code 500', (done) => {
    const userDetails = employeeJSON.getEmployeeData;
    request(app)
      .get('/payroll/getEmployee')
      .set({ Authorization: "rgs.srgws.srgw" })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.message).to.be.equal('UNAUTHORIZED');
        done();
      });
  })
})

describe('deleteEmployee API', () => {
  beforeEach((done) => {
    request(app)
      .post('/users/login')
      .send(employeeJSON.loginData1)
      .end((err, res) => {
        if (err) {
          done();
        }
        jwToken = res.body.data.token;
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User Login successfully');
        done();
      });
  });

  it('if valid token recieved should give status code 200', (done) => {
    const userDetails = employeeJSON.deleteEmployeeData;
    request(app)
      .delete('/payroll/deleteEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' Employee records Deleted');
        done();
      });
  })

  it('if invalid token recieved should give status code 401', (done) => {
    const userDetails = employeeJSON.deleteEmployeeData;
    request(app)
      .delete('/payroll/deleteEmployee')
      .set({ Authorization: "ESF.AEF.AEEF" })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.message).to.be.equal('UNAUTHORIZED');
        done();
      });
  })

})

describe('updateEmployee API', () => {
  beforeEach((done) => {
    request(app)
      .post('/users/login')
      .send(employeeJSON.loginData1)
      .end((err, res) => {
        if (err) {
          done();
        }
        jwToken = res.body.data.token;
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' User Login successfully');
        done();
      });
  });

  it('if valid token recieved should update database', (done) => {
    const userDetails = employeeJSON.updateEmployeeData1;
    console.log(jwToken);
    request(app)
      .put('/payroll/updateEmployee')
      .set({ Authorization: jwToken })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal(' Employee records Updated');
        done();
      });
  })
  it('if invalid token recieved should not update database', (done) => {
    const userDetails = employeeJSON.updateEmployeeData1;
    console.log(jwToken);
    request(app)
      .put('/payroll/updateEmployee')
      .set({ Authorization: "sefs.awetfwE.AWETGF" })
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.message).to.be.equal('UNAUTHORIZED');
        done();
      });
  })
})