'use strict';


const supertest = require('supertest');
const {server} = require('../src/server');
const mockRequest = supertest(server);
const { db } = require('../src/models/index');



beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});


let users = {
    Admin: { username: 'wwwwq', password: 'password', userRole: 'Admin' ,userAddress :"Amman ",userPhone:"33222", userEmail :"wwewewewew"},
    Customer: { username: 'ahmed', password: 'password', userRole: 'Customer' ,userAddress :"irbid ",userPhone:"545454", userEmail :"wwewew",},
   
};




let status = {
    StatusName : "avalibale"
}

describe('Stutas', () => {
    it('can create one', async () => {
        const response = await mockRequest.post('/signup').send(users.Admin);
        const userObject = response.body;
        expect(response.status).toBe(201);
        expect(userObject.user.id).toBeDefined();

        expect(userObject.user.username).toEqual(users.Admin.username);
        expect(userObject.user.userRole).toEqual(users.Admin.userRole);
        expect(userObject.user.userAddress).toEqual(users.Admin.userAddress);
        expect(userObject.user.userPhone).toEqual(users.Admin.userPhone);
        expect(userObject.user.userEmail).toEqual(users.Admin.userEmail);
       

    });

    it('can sign-in with basic header', async () => {
        const response = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users.Admin.username);
        expect(userObject.user.userRole).toEqual(users.Admin.userRole);
    });

   it('can sign-in with bearer headers', async () => {
        const response = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const token = response.body.token;
        const bearerResponse = await mockRequest.get('/users').set('Authorization', `Bearer ${token}`)
        expect(bearerResponse.status).toBe(200);
    });
        
        
            it('create new status', async () => {
                const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);

                const response = await mockRequest.post('/status').send(status).set('Authorization', `Bearer ${auth.body.token}`);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.id).toBeDefined();
                expect(userObject.StatusName).toEqual(status.StatusName);
                
            })

            it('get spicific status', async () => {
                const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);

                const response = await mockRequest.get('/status/1').set('Authorization', `Bearer ${auth.body.token}`);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject[0].id).toBeDefined();
                expect(userObject[0].StatusName).toEqual(status.StatusName);
                
            })
        
            it('Update a status', async () => {
                const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
                 let newStaus = {
                    StatusName : "not avalibale"
                   }
                   
                const response = await mockRequest.put('/status/1').send(newStaus).set('Authorization', `Bearer ${auth.body.token}`);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.id).toBeDefined();
                expect(userObject.StatusName).toEqual(newStaus.StatusName);
                
            })
        

            it('Get all status', async () => {
                 let newStaus = {
                    StatusName : "not avalibale"
                   }
                const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);

                const response = await mockRequest.get('/status').set('Authorization', `Bearer ${auth.body.token}`);
                const userObject = response.body;
                expect(response.status).toBe(200);
                userObject.forEach(item =>{

                     expect(item.id).toBeDefined();

                })
                expect(userObject[0].StatusName).toEqual(newStaus.StatusName);

                
            })


        });