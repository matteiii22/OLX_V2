const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
// În producție, pune asta într-un .env file
const JWT_SECRET = 'super_secret_key_123';

app.use(cors());
app.use(bodyParser.json());

// Simulare bază de date (în producție folosești o bază de date reală)
const users = [
    {
        id: 1,
        username: 'admin',
        // parola: admin123 (hashed)
        password: '$2b$10$HOfoLK5jY7RZ9Uc0Z4V7M.XJqEJYIyaVAbXo1H9Y1Sj5h2PSULfbO',
        role: 'admin'
    }
];

// Middleware pentru verificarea token-ului
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({
            success: false,
            message: 'Nu există token de autentificare'
        });
    }

    try {
        // Bearer TOKEN_STRING
        const token = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token invalid sau expirat'
        });
    }
};

// Rută pentru login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Găsește utilizatorul
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Utilizator sau parolă incorectă'
            });
        }

        // Verifică parola
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Utilizator sau parolă incorectă'
            });
        }

        // Creează token-ul
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' } // Token-ul expiră în 24 ore
        );

        // Trimite răspunsul
        res.json({
            success: true,
            message: 'Autentificare reușită',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Eroare la server'
        });
    }
});

// Exemplu de rută protejată
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({
        success: true,
        message: 'Acces autorizat',
        userData: req.user
    });
});

// Rută pentru a verifica dacă token-ul este valid
app.get('/api/verify-token', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});