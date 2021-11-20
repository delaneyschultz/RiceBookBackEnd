/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
let cookie;

describe('Validatation', () => {

    it('register new user', (done) => {
        let regUser = {username: 'testUser', email: 'Ziyana@gmail.com', dob: '100987', zipcode: '12345', password: '123'} ;
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'testUser', password: '123'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            console.log("cookie is ", cookie);
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });


    it('should update the headline', (done) => {
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
            body:  JSON.stringify({status: 'Happy'})
        }).then(res => res.json()).then(res => {
            console.log(res)
            expect(res.headline).toBe('Happy')
            done();
        });
    });

    it('should get headline', (done) => {
        fetch(url('/headline/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
        }).then(res => res.json()).then(res => {
            console.log(res);
            expect(res.headline).toBe('Happy');
            done();
        });
    });


    it('should create a new article', (done) => {
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
            body:  JSON.stringify({text: 'New Post'})
        }).then(res => res.json()).then(res => {
            expect(res.text).toBe('New Post');
            done();
        });
    });


    it('should get the new article', (done) => {
        fetch(url('/articles/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
        }).then(res => res.json()).then(res => {
            if (res instanceof Array) {
                let id = res.length - 1;
                let newPost = res[id];
                expect(newPost.author).toBe('testUser');
                expect(newPost.text).toBe('New Post');
                done();
            }
        });
    });

    it('should logout', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'text/plain', 'cookie': cookie},
            body:  null
        }).then(res => {
            expect(res.statusText).toBe('OK');
            done();
        });
    });





});