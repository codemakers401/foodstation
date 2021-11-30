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
    Admin: { username: 'munes', password: 'password', userRole: 'Admin' ,userAddress :"Amman ",userPhone:"079", userEmail :"munes1"},
    Customer: { username: 'ahmed', password: 'password', userRole: 'Customer' ,userAddress :"irbid ",userPhone:"078", userEmail :"ahmed1",},
    Driver: { username: 'Ali', password: 'password', userRole: 'Driver' ,userAddress :"Amman ",userPhone:"0797", userEmail :"ali1"},

};






describe('check status route with admin', () => {
    it('create admin account ', async () => {
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

    it('can sign-in with basic header admin', async () => {
        const response = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users.Admin.username);
        expect(userObject.user.userRole).toEqual(users.Admin.userRole);
    });

   it('can sign-in with bearer headers admin', async () => {
        const response = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const token = response.body.token;
        const bearerResponse = await mockRequest.get('/users').set('Authorization', `Bearer ${token}`)
        expect(bearerResponse.status).toBe(200);
    });





    it('can create item by Admin', async () => {

let itemObject ={
    itemName:"pizzaaa",
         itemCategory:"pizzaaaa" ,
         itemPrice : 5,
         restaID : 1,
         available : true
}

let restaurantObject = {
restaurantName : " kfs",
restaurantLocation : "amman"
}
// We should first create resturant 


        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const resturantResponse = await mockRequest.post('/restaurant').send(restaurantObject).set('Authorization', `Bearer ${auth.body.token}`);

        const response = await mockRequest.post('/item').send(itemObject).set('Authorization', `Bearer ${auth.body.token}`);
        const itemObjectResponse = response.body;
        
        expect(response.status).toBe(201);
        expect(itemObjectResponse.id).toBeDefined();
        expect(itemObjectResponse.restaID).toEqual(itemObject.restaID);
        expect(itemObjectResponse.itemName).toEqual(itemObject.itemName);
        expect(itemObjectResponse.itemCategory).toEqual(itemObject.itemCategory);
        expect(itemObjectResponse.itemPrice).toEqual(itemObject.itemPrice);
        expect(itemObjectResponse.available).toEqual(itemObject.available);

    });
    
    it('can get all item by Admin', async () => {

        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const response = await mockRequest.get('/item').send().set('Authorization', `Bearer ${auth.body.token}`);
        const itemObject = response.body;
        let restID = itemObject[0].restaID
        const response2 = await mockRequest.get(`/restaurant/${restID}`).send().set('Authorization', `Bearer ${auth.body.token}`);
       let resturantDetails = response2.body
        let restName =  resturantDetails[0].restaurantName
        let restLocation =  resturantDetails[0].restaurantLocation 
        expect(response.status).toBe(200);
        expect(itemObject[0].itemId).toBeDefined();
        expect(itemObject[0].restaurantName).toEqual(restName);
        expect(itemObject[0].Location).toEqual(restLocation);
    });

    it('can get specific item by Admin', async () => {

        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const response = await mockRequest.get('/item/1').send().set('Authorization', `Bearer ${auth.body.token}`);
        const itemObject = response.body;
        let restID = itemObject[0].restaID
        const response2 = await mockRequest.get(`/restaurant/${restID}`).send().set('Authorization', `Bearer ${auth.body.token}`);
        let resturantDetails = response2.body
        let restName =  resturantDetails[0].restaurantName
        let restLocation =  resturantDetails[0].restaurantLocation 
        expect(response.status).toBe(200);
        expect(itemObject[0].itemId).toBeDefined();
        expect(itemObject[0].restaurantName).toEqual(restName);
        expect(itemObject[0].Location).toEqual(restLocation);
    });

    it('can update item by Admin', async () => {
        let newItemObject ={
            itemName:"flafel",
                 itemCategory:"flafel" ,
                 itemPrice : 5,
                 restaID : 1,
                 available : true
        }
        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const response = await mockRequest.put('/item/1').send(newItemObject).set('Authorization', `Bearer ${auth.body.token}`);
        const itemObject = response.body;
        expect(response.status).toBe(200);
        expect(itemObject.id).toBeDefined();
        expect(itemObject.restaID).toEqual(newItemObject.restaID);
        expect(itemObject.itemName).toEqual(newItemObject.itemName);
        expect(itemObject.itemCategory).toEqual(newItemObject.itemCategory);
        expect(itemObject.itemPrice).toEqual(newItemObject.itemPrice);
        expect(itemObject.available).toEqual(newItemObject.available);

    });


    it('can get item by resturant id  by Admin', async () => {
        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const response = await mockRequest.get('/itemByRes/1').send().set('Authorization', `Bearer ${auth.body.token}`);
        const response2 = await mockRequest.get(`/restaurant/1`).send().set('Authorization', `Bearer ${auth.body.token}`);
       let resturantObject =  response2.body
       let resturantName = resturantObject[0].restaurantName
       let resturantLocation = resturantObject[0].restaurantLocation
        const itemObject = response.body;
        expect(response.status).toBe(200);
        expect(itemObject[0].itemId).toBeDefined();
        expect(itemObject[0].restaurantName).toEqual(resturantName);
        expect(itemObject[0].Location).toEqual(resturantLocation);

    });


  


})


describe('check status route with customer', () => {


    it('create customer account ', async () => {
        const response = await mockRequest.post('/signup').send(users.Customer);
        const userObject = response.body;
        expect(response.status).toBe(201);
        expect(userObject.user.id).toBeDefined();

        expect(userObject.user.username).toEqual(users.Customer.username);
        expect(userObject.user.userRole).toEqual(users.Customer.userRole);
        expect(userObject.user.userAddress).toEqual(users.Customer.userAddress);
        expect(userObject.user.userPhone).toEqual(users.Customer.userPhone);
        expect(userObject.user.userEmail).toEqual(users.Customer.userEmail);
       

    });

    it('can sign-in with basic header customer', async () => {
        const response = await mockRequest.post('/signin').auth(users.Customer.username, users.Customer.password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users.Customer.username);
        expect(userObject.user.userRole).toEqual(users.Customer.userRole);
    });


    it('can get all item by Customer', async () => {

        const auth = await mockRequest.post('/signin').auth(users.Customer.username, users.Customer.password);
        const response = await mockRequest.get('/item').send().set('Authorization', `Bearer ${auth.body.token}`);
        const itemObject = response.body;
        let restID = itemObject[0].restaID
        const response2 = await mockRequest.get(`/restaurant/${restID}`).send().set('Authorization', `Bearer ${auth.body.token}`);
       let resturantDetails = response2.body
        let restName =  resturantDetails[0].restaurantName
        let restLocation =  resturantDetails[0].restaurantLocation 
        expect(response.status).toBe(200);
        expect(itemObject[0].itemId).toBeDefined();
        expect(itemObject[0].restaurantName).toEqual(restName);
        expect(itemObject[0].Location).toEqual(restLocation);
    });

    it('can create item by Customer', async () => {

        let itemObject ={
            itemName:"pizza",
                 itemCategory:"pizza" ,
                 itemPrice : 5,
                 restaID : 1,
                 available : true
        }
        
        
        
                const auth = await mockRequest.post('/signin').auth(users.Customer.username, users.Customer.password);
        
                const response = await mockRequest.post('/item').send(itemObject).set('Authorization', `Bearer ${auth.body.token}`);
                const itemObjectResponse = response.body;
                expect(response.status).toBe(500);
                expect(itemObjectResponse.message).toEqual("Access Denied  --- acl");
        
            });

})


describe('check status route with driver', () => {


    it('create driver account ', async () => {
        const response = await mockRequest.post('/signup').send(users.Driver);
        const userObject = response.body;
        expect(response.status).toBe(201);
        expect(userObject.user.id).toBeDefined();

        expect(userObject.user.username).toEqual(users.Driver.username);
        expect(userObject.user.userRole).toEqual(users.Driver.userRole);
        expect(userObject.user.userAddress).toEqual(users.Driver.userAddress);
        expect(userObject.user.userPhone).toEqual(users.Driver.userPhone);
        expect(userObject.user.userEmail).toEqual(users.Driver.userEmail);
       

    });

    it('can sign-in with basic header driver', async () => {
        const response = await mockRequest.post('/signin').auth(users.Driver.username, users.Driver.password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users.Driver.username);
        expect(userObject.user.userRole).toEqual(users.Driver.userRole);
    });


    it('can get all item by driver', async () => {

        const auth = await mockRequest.post('/signin').auth(users.Driver.username, users.Driver.password);
        const response = await mockRequest.get('/item').send().set('Authorization', `Bearer ${auth.body.token}`);
        const itemObject = response.body;
        let restID = itemObject[0].restaID
        const response2 = await mockRequest.get(`/restaurant/${restID}`).send().set('Authorization', `Bearer ${auth.body.token}`);
       let resturantDetails = response2.body
        let restName =  resturantDetails[0].restaurantName
        let restLocation =  resturantDetails[0].restaurantLocation 
        expect(response.status).toBe(200);
        expect(itemObject[0].itemId).toBeDefined();
        expect(itemObject[0].restaurantName).toEqual(restName);
        expect(itemObject[0].Location).toEqual(restLocation);
    });

    it('can create item by driver', async () => {

        let itemObject ={
            itemName:"pizza",
                 itemCategory:"pizza" ,
                 itemPrice : 5,
                 restaID : 1,
                 available : true
        }
        
        
        
                const auth = await mockRequest.post('/signin').auth(users.Driver.username, users.Driver.password);
        
                const response = await mockRequest.post('/item').send(itemObject).set('Authorization', `Bearer ${auth.body.token}`);
                const itemObjectResponse = response.body;
                expect(response.status).toBe(500);
                expect(itemObjectResponse.message).toEqual("Access Denied  --- acl");
        
            });

})


describe('check delete item by Admin', () => {
  it('can delete item by Admin', async () => {
        const auth = await mockRequest.post('/signin').auth(users.Admin.username, users.Admin.password);
        const response = await mockRequest.delete('/item/1').send().set('Authorization', `Bearer ${auth.body.token}`);
        expect(response.status).toBe(200);


    });
})