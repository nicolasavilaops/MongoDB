// MongoDB Connection Helper
// Arquivo: db/mongodb.js

const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'avilaops';

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      retryWrites: true,
    });

    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    cachedClient = client;
    return client;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(process.env.MONGODB_DB || 'avilaops');
}

async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    console.log('MongoDB connection closed');
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  closeDatabase,
};
