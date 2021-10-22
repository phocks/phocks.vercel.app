// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const feedsToFetch = [
  "https://phocks.vercel.app/feed.json",
  "https://ash.ms/micro.json",
];

const getData = async (feedsToFetch) => {
  const data = await Promise.all(
    feedsToFetch.map(async (url) => {
      const resp = await fetch(url);
      const feedObject = await resp.json();
      const finalFeed = { fetched_url: url, ...feedObject };
      return finalFeed;
    })
  );

  return data;
};

export default async function handler(req, res) {
  const data = await getData(feedsToFetch);
  res.status(200).json(data);
}
