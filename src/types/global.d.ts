import { MongoClient } from "mongodb";

declare global {
    // allow global `_mongoClientPromise` to be accessible in TS
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export { };