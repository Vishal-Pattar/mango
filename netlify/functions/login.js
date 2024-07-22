const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('mangodb');
    const users = db.collection('users');

    try {
        const user = await users.findOne({ username });
        if (!user) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid username or password' }),
            };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid username or password' }),
            };
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await client.close();
        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};