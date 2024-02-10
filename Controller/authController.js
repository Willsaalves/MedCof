const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const generateHashedPassword = async () => {
  return await bcrypt.hash('password', 10);
};

const createMockUser = async () => {
  try {
    const hashedPassword = await generateHashedPassword();
    return {
      id: 1,
      username: 'user',
      password: hashedPassword,
    };
  } catch (error) {
    throw new Error('Erro ao gerar a senha hash.');
  }
};

const tokenSecret = 'your_jwt_secret_key';

// Middleware para verificação do token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = decoded.user;
    next();
  });
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  try {
    const mockUser = await createMockUser();
    const isPasswordMatch = await bcrypt.compare(password, mockUser.password);

    if (username !== mockUser.username || !isPasswordMatch) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const token = jwt.sign({ userId: mockUser.id }, tokenSecret, { expiresIn: '1h' });

    return res.status(200).json({ auth: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json("Authenticated");
});

module.exports = router;
