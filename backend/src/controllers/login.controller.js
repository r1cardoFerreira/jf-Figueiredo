const autentService = require('../services/admin.service');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await autentService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}


module.exports = { login };