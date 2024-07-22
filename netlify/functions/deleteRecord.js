const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

exports.handler = async (event) => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('mangodb');
    const collection = db.collection('mangocollection');

    const { id } = JSON.parse(event.body);

    try {
        await collection.deleteOne({ _id: ObjectId(id) });
        await client.close();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Record deleted' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};