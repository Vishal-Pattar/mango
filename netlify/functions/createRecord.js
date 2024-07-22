const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.handler = async (event) => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('mangodb');
    const collection = db.collection('mangocollection');

    const record = JSON.parse(event.body);

    try {
        const result = await collection.insertOne(record);
        await client.close();
        return {
            statusCode: 200,
            body: JSON.stringify({ id: result.insertedId }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};