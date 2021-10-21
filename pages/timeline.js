import Head from "next/head";
import { useEffect } from "react";
import * as dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
import Linkify from 'react-linkify';

import Navigation from "../components/navigation";
import styles from "../styles/Home.module.css";

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
      return finalFeed;
    })
  );

  // Pass data to the page via props
  return { props: { data } };
}

const getItems = (data) => {
  const itemsArray = data.map((d) => {
    const { items, title, fetched_url } = d;

    const itemsWithSource = items.map((item) => {
      return { title, fetched_url, ...item };
    });

    return itemsWithSource;
  });

  const combinedItems = itemsArray.flat(1);

  const sortedCombinedItems = combinedItems.sort((a, b) => {
    // TODO: Apparently creating new Dates like this is bad
    // Maybe find another way
    return new Date(b.date_published) - new Date(a.date_published);
  });
  return { items: sortedCombinedItems };
};

export default function Timeline({ data }) {
  const { items } = getItems(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Timeline - JB - a micro blog</title>
      </Head>

      <>
        <h1 className={styles.title}>Following timeline</h1>
        <Navigation />
        <div className={styles.subtitle}>
          Updates from people I follow. Including Ash Kyd and me.
        </div>

        <div className={styles.posts}>
          {items?.map((item, iteration) => {
            const { date_published, content_text, title, fetched_url } = item;

            return (
              <div className={styles.item} key={iteration}>
                <div className={styles.date}>
                  <abbr title={date_published}>
                    {dayjs(date_published).fromNow()}
                  </abbr>{" "}
                  &middot;{" "}
                  <a className={styles.source} href={fetched_url}>
                    {title}
                  </a>
                </div>
                <Linkify>{content_text}</Linkify>
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
}
