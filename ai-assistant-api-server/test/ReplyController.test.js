//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe("ReplyController", function() {

    describe("#reply()", function() {

        var BASE_URL = "http://ai-assistant-api-server:3000",
            BOT_ID = "5f74865056d7bb000fcd39ff",
            API_PATH = `/api/chat-rooms/1ea4df/bots/5f74865056d7bb000fcd39ff/reply`

        it('should reply to input message for valid input', (done) => {
            chai.request(BASE_URL)
                .post(API_PATH)
                .send({
                    "message": "Hello",
                    "confidenceThreshold": 0.6
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text');
                    res.body.should.have.property('id');
                    done();
                });
        }).timeout(10000);

        it("should tell the visitor that the AI could not give the correct answer. if bot inferred confidence level below threshold confidence.", (done) => {
            chai.request(BASE_URL)
                .post(API_PATH)
                .send({
                    "message": "Hello",
                    "confidenceThreshold": 0.6
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text');
                    done();
                });
        }).timeout(10000);

        it("should tell the visitor that the AI could not give the correct answer. if message intent is not recognised by bot", (done) => {
            chai.request(BASE_URL)
                .post(API_PATH)
                .send({
                    "message": "what no?",
                    "confidenceThreshold": 0.6
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text');
                    done();
                });
        }).timeout(10000);


        it("should tell the visitor that the AI could not give the correct answer. if intent reply not found in database.", (done) => {
            chai.request(BASE_URL)
                .post(API_PATH)
                .send({
                    "message": "what no?",
                    "confidenceThreshold": 0.6
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text');
                    done();
                });
        }).timeout(10000);

        it('should return 401 statusCode if botId is invalid.', (done) => {
            chai.request(BASE_URL)
                .post('/api/chat-rooms/1ea4df/bots/INVALID_BOT_IDENTIFIER/reply?confidenceThreshold=0.6')
                .send({
                    "message": "Hello",
                    "confidenceThreshold": 0.6
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('should return 401 statusCode if message is not passed.', (done) => {
            chai.request(BASE_URL)
                .post(API_PATH)
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });



    });
});