import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mmdseq:f$0ciethY@cluster0.l7w3g.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  // All documents ids
  return {
    //2
    fallback: false,

    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),

    // before fetching data from db
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mmdseq:f$0ciethY@cluster0.l7w3g.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  //   const selectedMeetup = await meetupsCollection.find({_id: meetupId})
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;

// we cant use react hooks like useRoute to get the meetupId in here, just in root components, so we should use context

// getStaticPaths is a function you need to export in a page conponent file if its a dynamic page and your using getStaticProps not when just using getServerSideProps and just getStaticProps

// fallback: false : contains all supported meetup id values , if users entered anything that not supported here for example m3 shes ganna see 404 page if true next js ganna creat a page for that dynamicly false for those pages that are visits frequntly
//

// context log, this loged in terminal on server(in vs code terminal) bcz codes inside getStaticProps only run on server not client browers
// m1
// {
//   params: { meetupId: 'm1' },
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined
// }
