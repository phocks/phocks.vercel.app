import Head from "next/head";
import { useEffect } from "react";
import * as dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import styles from "../styles/Timeline.module.css";

const feedsToFetch = [
  "https://phocks.vercel.app/feed.json",
  "https://ash.ms/micro.json",
];

export async function getServerSideProps() {
  var data = await Promise.all(
    feedsToFetch.map(async (url) => {
      const resp = await fetch(url);
      const feedObject = await resp.json();
      const finalFeed = { fetched_url: url, ...feedObject };
      console.log(finalFeed);
      return finalFeed;
    })
  );

  // Pass data to the page via props
  return { props: { data } };
}

export default function Timeline({ data }) {
  const getItems = () => {
    const itemsArray = data.map((d) => {
      const { items, title, fetched_url } = d;

      const itemsWithSource = items.map((item) => {
        return { title, fetched_url, ...item };
      });

      return itemsWithSource;
    });

    const combinedItems = itemsArray.flat(1);

    const sortedCombinedItems = combinedItems.sort((a, b) => {
      // return b.date_published - a.date_published

      return new Date(b.date_published) - new Date(a.date_published);
    });
    return { items: sortedCombinedItems };
  };

  const { items } = getItems();

  return (
    <div className={styles.container}>
      <Head></Head>

      <>
        <h1>phocks's timeline</h1>
        <div className={styles.subtitle}>
          Updates from people I follow. Repo{" "}
          <a href="https://github.com/phocks/phocks.vercel.app">here</a>. Feed{" "}
          <a href="/feed.json">here</a>. Uses{" "}
          <a href="https://www.jsonfeed.org/">JSON Feed</a> for syndication.
        </div>

        <div className={styles.posts}>
          {items?.map((item, iteration) => {
            const { date_published, content_text, title, fetched_url } = item;

            return (
              <div className={styles.item} key={iteration}>
                <div className={styles.date}>
                  <abbr title={date_published}>
                    {dayjs(date_published).fromNow()}
                  </abbr> &middot; <a className={styles.source} href={fetched_url}>{title}</a>
                </div>
                {content_text}
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
}
