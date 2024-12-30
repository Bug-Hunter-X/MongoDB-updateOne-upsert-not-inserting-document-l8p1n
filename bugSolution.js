```javascript
const { MongoClient } = require('mongodb');

async function upsertUser(client, name, age) {
  const db = client.db('your_database_name');
  const collection = db.collection('users');
  const query = { name: name };
  const existingUser = await collection.findOne(query);

  if (existingUser) {
    await collection.updateOne(query, { $set: { age: age } });
    console.log('User updated');
  } else {
    const newUser = { name: name, age: age };
    await collection.insertOne(newUser);
    console.log('User inserted');
  }
}

async function main() {
  const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await upsertUser(client, 'John Doe', 30);
  } finally {
    await client.close();
  }
}

main();
```