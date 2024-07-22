const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('mangodb');
    const users = db.collection('users');

    try {
        const user = await users.findOne({ username });
        if (user) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Username already exists' }),
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await users.insertOne({ username, password: hashedPassword });

        await client.close();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
