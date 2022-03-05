import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb"; // nextJs runs this line in server
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  //1
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

2;
export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://mmdseq:f$0ciethY@cluster0.l7w3g.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      //3
      revalidate: 1,
    },
  };
}

export default HomePage;
