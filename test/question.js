const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');

const Question = require('../models/question');
const questionController = require('../controllers/question');

chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe('Question Controller', function () {
  describe('GET - /questions/:category', function () {
    it('should get questions with status 200', function (done) {
      chai.request(url)
        .get('/questions/geography')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should get questions with limit of 3', function (done) {
      sinon.stub(Question, 'find');
      Question.find.returns([
        'questionOne', 'questionTwo', 'questionThree', 'questionFour', 'questionFive',
      ]);

      const req = {
        params: { category: '' },
        query: { limit: 3 },
      };

      const res = {
        status() {
          return this;
        },
        json() {},
      };

      questionController.getQuestions(req, res, () => {}).then((questions) => {
        expect(questions).to.be.an('array');
        expect(questions).to.have.lengthOf(3);
        done();
      }).catch(done);

      Question.find.restore();
    });

    it('should get all questions if no limit is set', function (done) {
      sinon.stub(Question, 'find');
      Question.find.returns([
        'questionOne', 'questionTwo', 'questionThree', 'questionFour', 'questionFive',
      ]);

      const req = {
        params: { category: '' },
      };

      const res = {
        status() {
          return this;
        },
        json() {},
      };

      questionController.getQuestions(req, res, () => {}).then((questions) => {
        expect(questions).to.be.an('array');
        expect(questions).to.have.lengthOf(5);
        done();
      }).catch(done);

      Question.find.restore();
    });

    it('should throw an error with status code 404 when no questions are found', function (done) {
      sinon.stub(Question, 'find');
      Question.find.returns(undefined);

      const req = {
        params: { category: 'geography' },
      };

      questionController.getQuestions(req, {}, () => {}).then((results) => {
        expect(results).to.be.an('error');
        expect(results).to.have.property('statusCode', 404);
        done();
      }).catch(done);

      Question.find.restore();
    });

    it('should throw an error with status code 500', function (done) {
      sinon.stub(Question, 'find');
      Question.find.throws();

      const req = {
        params: { category: 'geography' },
      };

      questionController.getQuestions(req, {}, () => {}).then((results) => {
        expect(results).to.be.an('error');
        expect(results).to.have.property('statusCode', 500);
        done();
      }).catch(done);

      Question.find.restore();
    });
  });
});
