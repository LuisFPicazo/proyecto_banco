const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('index');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await fetch(`http://localhost:3001/usuarios?email=${email}&password=${password}`);
        const users = await response.json();

        if (users.length > 0) {
            const usuario = users[0];
            res.status(200).json(usuario);
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al consultar JSON Server:', error);
        res.status(500).json({ message: 'Error de servidor' });
    }
});

router.get('/dashboard', async (req, res) => {
    const userId = req.query.id;

    try {
        const response = await fetch(`http://localhost:3001/usuarios/${userId}`);
        const usuario = await response.json();

        // Renderizas la vista con los datos del usuario
        res.render('dashboard', { usuario });
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
});


module.exports = router;
