'use strict'

const router = require('../src/routes/restaurant')
const supertest = require('supertest')

const {server} = require('../src/server')
const mockRequest = supertest(server);
const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

let user = {
    
        username: 'Nedal',
        password: '123',
        userRole: 'Admin',
        userAddress: 'Amman',
        userPhone: '0797778889',
        userEmail: 'nedal@gmail.com',
      
}

describe('Restaurent router', ()=>{

  it('It should GET the restaurant by ID',async ()=>{
   
    await mockRequest.post("/signup").send(
        user
      );

      let auth = await mockRequest.post("/signin").auth("Nedal", "123");

      let res = await mockRequest
        .post("/restaurant")
        .send({
            restaurantName: 'ABC',
            restaurantLocation: 'Amman',
        })
        .set("Authorization", `Bearer ` + auth.body.token);

         res = await mockRequest
        .get("/restaurant/1")
        .set("Authorization", `Bearer ` + auth.body.token);
        

        expect(res.status).toEqual(200)
 })

  it('It should GET ALL restaurant',async ()=>{
   
    await mockRequest.post("/signup").send(
        user
      );

      let auth = await mockRequest.post("/signin").auth("Nedal", "123");

      let res = await mockRequest
        .post("/restaurant")
        .send({
            restaurantName: 'ABC',
            restaurantLocation: 'Amman',
        })
        .set("Authorization", `Bearer ` + auth.body.token);

         res = await mockRequest
        .get("/restaurant")
        .set("Authorization", `Bearer ` + auth.body.token);
        

        expect(res.status).toEqual(200)
 })

   it('It should add the restaurant details',async ()=>{
   
    await mockRequest.post("/signup").send(
        user
      );

      let auth = await mockRequest.post("/signin").auth("Nedal", "123");

      let res = await mockRequest
        .post("/restaurant")
        .send({
            restaurantName: 'ABC',
            restaurantLocation: 'Amman',
        })
        .set("Authorization", `Bearer ` + auth.body.token);


        expect(res.status).toEqual(201)
 })
   it('It should update the restaurant details',async ()=>{
   
    await mockRequest.post("/signup").send(
        user
      );

      let auth = await mockRequest.post("/signin").auth("Nedal", "123");

      let res = await mockRequest
        .put("/restaurant/1")
        .send({
            restaurantName: 'XYZ',
            restaurantLocation: 'Amman',
        })
        .set("Authorization", `Bearer ` + auth.body.token);


        expect(res.status).toEqual(200)
 })
//    it('It should delete the restaurant details',async ()=>{
   
//     await mockRequest.post("/signup").send(
//         user
//       );

//       let auth = await mockRequest.post("/signin").auth("Nedal", "123");

//       let res = await mockRequest
//         .delete("/restaurant/1")
//         .send({
//             restaurantName: 'XYZ',
//             restaurantLocation: 'Amman',
//         })
//         .set("Authorization", `Bearer ` + auth.body.token);


//         expect(res.status).toEqual(200)
//  })

})
