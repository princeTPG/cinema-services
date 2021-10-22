/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import {
  mongooseConnect,
  mongooseDisconnect,
} from '../../../services/mongoose';
import { theaterApi as theaterApiConstants } from '../../../constants/api';
import router from '../routes';

chai.use(chaiHttp);
chai.should();
const testMongoUri =
  'mongodb://root:example@localhost:27017/cinemaDb?authSource=admin&w=1';

describe('Theater Apis', () => {
  before((done) => {
    mongooseConnect(testMongoUri, () => {
      done();
    });
  });
  after((done) => {
    mongooseDisconnect();
    done();
  });
  it('add theater api - SUCCESS', (done) => {
    const theaterMock = {
      location: {
        city: 'noida',
        phoneNumber: '12089109',
        state: 'UP',
        street: null,
        zipCode: '201304',
      },
      name: 'PVR',
    };
    chai
      .request(router)
      .post(theaterApiConstants.ADD)
      .send(theaterMock)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('add theater api - ERROR', (done) => {
    const theaterMock = {
      name: 'PVR',
    };
    chai
      .request(router)
      .post(theaterApiConstants.ADD)
      .send(theaterMock)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('get-all theater api- SUCCESS', (done) => {
    chai
      .request(router)
      .get(theaterApiConstants.GET_ALL)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.total).to.be.an('number');
        done();
      });
  });
  it('get theater by id api', (done) => {
    const theaterIdMock = '614239d853c6dfdd07ee7de1';
    chai
      .request(router)
      .get(`/${theaterIdMock}`)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
