# Micro blog

Testing out an idea I had for a static feed of posts that could be syndicated across different web hosts.

In its simplest form it is just a simple [JSON Feed](https://www.jsonfeed.org/) of date-ordered posts hosted somewhere on the web. Make sure you have [CORS enabled](https://enable-cors.org/) so web browser clients can read your feed.

A client app can then "consume" those feeds and splice them together into a timeline.

## Structure

I have the post feed in `/public` and am using a simple [Next.js](https://nextjs.org/) app to read the JSON and turn the posts into a timeline.

## Make your own

Feel free to fork this repo and deploy to [Vercel](https://vercel.com) or wherever you like.

I'll keep a list of micro blogs here:

- [Joshua Byrd](https://phocks.vercel.app)
- [Ash Kyd](https://ash.ms/micro.json)
