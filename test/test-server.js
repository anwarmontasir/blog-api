const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('blog post', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should list items on GET', function() {
        return chai
        .request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.at.least(1);
            const expectedKeys = ['title', 'content', 'author'];
            res.body.forEach(function(item) {
                expect(item).to.be.a('object');
                expect(item).to.include.keys(expectedKeys);
            })
        });
    });

    it('should add an item on POST', function() {
        const newPost = {title: 'Hello World', content: 'Lorem Ipsum', author: 'Socrates'};
        return chai
        .request(app)
        .post('/blog-posts')
        .send(newPost)
        .then(function(res) {
            expect(res).to.have.status(201);
            // expect(res).to.be.json;
            // expect(res.body).to.be.a('object');
            // expect(res.body).to.include.keys('title', 'content', 'author');
            // expect(res.body.id).to.not.equal(null);
            // expect(res.body).to.deep.equal(
            //     Object.assign(newPost, {id: res.body.id })
            // );
        });
    });
});