const { Storage } = require("@google-cloud/storage");

// Creates a client using Application Default Credentials
const storage = new Storage();

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: "C:/Users/RM/Desktop/express demo/arty-bot-dev-29c4e1e9a1c3.json"});
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = "hello-buck";

async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  // console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);
