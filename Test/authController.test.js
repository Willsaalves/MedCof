const axios = require('axios');
const express = require('express');
const authController = require('../Controller/authController');

const app = express();
app.use(express.json());
app.use('/auth', authController);

describe('Authentication Endpoint Tests', () => {
  test('Should return 200 OK with a valid username and password', async () => {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: 'user',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  test('Should return 400 Bad Request with missing username or password', async () => {
    try {
      await axios.post('http://localhost:3000/auth/login', {});
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error', 'Bad Request');
    }
  });

  test('Should return 403 Forbidden with invalid username or password', async () => {
    try {
      await axios.post('http://localhost:3000/auth/login', {
        username: 'invalid',
        password: 'invalid',
      });
    } catch (error) {
      expect(error.response.status).toBe(403);
      expect(error.response.data).toHaveProperty('error', 'Forbidden');
    }
  });
});
