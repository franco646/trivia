const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');

const Player = require('../models/player');
const playerController = require('../controllers/player');

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Player Controller', function () {
  describe('POST - /player', function () {
    it('should add new player with status 200', function (done) {
      chai.request(url)
        .post('/player')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name: 'test', category: 'geography', correctAnswers: 5 })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should throw an error with status code 500', function (done) {
      sinon.stub(Player, 'create');
      Player.create.throws();

      const req = {
        body: {
          name: 'test',
          category: 'geography',
          correctAnswers: 5,
        },
      };

      playerController.postPlayer(req, {}, () => {}).then((results) => {
        expect(results).to.be.an('error');
        expect(results).to.have.property('statusCode', 500);
        done();
      }).catch(done);

      Player.create.restore();
    });
  });
  describe('GET - /players/:category', function () {
    it('should get players with status 200', function (done) {
      chai.request(url)
        .get('/players/geography')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should throw an error with status code 404 when no players are found', function (done) {
      sinon.stub(Player, 'find');
      Player.find.returns(undefined);

      const req = {
        params: { category: 'geography' },
      };

      playerController.getPlayers(req, {}, () => {}).then((results) => {
        expect(results).to.be.an('error');
        expect(results).to.have.property('statusCode', 404);
        done();
      }).catch(done);

      Player.find.restore();
    });

    it('should throw an error with status code 500', function (done) {
      sinon.stub(Player, 'find');
      Player.find.throws();

      const req = {
        params: { category: 'geography' },
      };

      playerController.getPlayers(req, {}, () => {}).then((results) => {
        expect(results).to.be.an('error');
        expect(results).to.have.property('statusCode', 500);
        done();
      }).catch(done);

      Player.find.restore();
    });
  });
});
