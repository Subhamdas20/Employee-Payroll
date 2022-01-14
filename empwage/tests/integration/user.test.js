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
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
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
        expect(res.body.message).to.be.equal(' Invalid Credentials');
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
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.message).to.be.equal(' Employee added successfully');
        done();
      });
  })
})