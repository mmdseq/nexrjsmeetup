import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://mmdseq:f$0ciethY@cluster0.l7w3g.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    //1
    //if db doesnt exist create
    const db = client.db(); //2

    //if colection doesnt exist create
    const meetupsCollection = db.collection("meetups"); //3

    // result automatic generate ID
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
