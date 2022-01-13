import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs';
import app from '../../src/index';


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
  it('if valid details sent should save in db', (done) => {
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
  it('if invalid emailId sent should not save in db', (done) => {
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
})