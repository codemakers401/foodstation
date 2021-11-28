'use strict';

const {server}= require('../src/server');
const supertest = require('supertest');
const request = supertest(server);
const { db } = require('../src/models/index');
beforeAll(async () => {
    await db.sync();
  });
// afterAll(async () => {
//     await db.drop();
//   });

  
describe('server testing', () => {

    test('check for signup', async () => {
        const respons = await request.post('/signup').send({
            username:"ali",
            password:"123",
            userRole:"Customer",
            userAddress:"amman",
            userPhone: "07998",
            userEmail:"cde@gmail.com"
        });
        expect(respons.status).toBe(201)
        
    });
     test('check if signing is working', async () => {
         const user = await request.post('/signup').send({
             username:"alijj",
            password:"123",
          userRole:"Admin",
           userAddress:"amman",
          userPhone: "07998",
           userEmail:"ytyty@gmail.com"
         });
        const respons = await request.post('/signin').auth("alijj",'123')
        expect(respons.status).toBe(200)   
     });
    
    test('check get.profile is working', async () => {
       const user = await request.post('/signup').send({
           username:"seer",
          password:"123",
          userRole:"Admin",
          userAddress:"amman",
         userPhone: "07998",
        userEmail:"hghg@gmail.com"
    });
    const respons = await request.post('/signin').auth("seer",'123')
      //expect(respons.status).toBe(200);

      const token=respons.body.token;
       const respons2= await request.get('/profile').set({ Authorization: `Bearer ${token}` });
        expect(respons2.status).toBe(200);
     });
    
     test('check put.profile is working', async () => {
        const user = await request.post('/signup').send({
           username:"ytyt",
           password:"123",
          userRole:"Admin",
         userAddress:"amman",
         userPhone: "07998",
        userEmail:"uuuik@gmail.com"
    });
      const respons = await request.post('/signin').auth("ytyt",'123')
    //     //expect(respons.status).toBe(200);

     const token=respons.body.token;
     const respons3= await request.put('/profile').send({username:"haneen",userAddress:"amman",
      userPhone: "0788"
    }).set({ Authorization: `Bearer ${token}` });
        expect(respons3.status).toBe(200);
    });
});