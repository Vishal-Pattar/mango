const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.handler = async () => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('mangodb');
    const collection = db.collection('mangocollection');

    try {
        const records = await collection.find({}).toArray();
        await client.close();
        return {
            statusCode: 200,
            body: JSON.stringify(records),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};