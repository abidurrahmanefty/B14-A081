import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

export async function getMongoClient(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(process.env.MONGODB_URI);
    await globalForMongo.mongoClient.connect();
  }

  return globalForMongo.mongoClient;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db();
}
