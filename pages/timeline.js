import Head from "next/head";
import { useEffect } from "react";
import useSWR from "swr";
import * as dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import styles from "../styles/Home.module.css";

export default function Home() {
  const fetcher = (...urls) => {
      console.log(urls);
    const f = (u) => fetch(u).then((r) => r.json());

  if (urls.length > 1) {
    return Promise.all(urls.map(f));
  }
  return f(urls);
  };
  const { data, error } = useSWR(
    ["https://phocks.vercel.app/feed.json",
    "https://ash.ms/micro.json"],
    fetcher
  );

  console.log(data)

  const { items, title } = data || [];

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Head></Head>

      {error && <div>failed to load</div>}

      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{title}</h1>
          <div className={styles.subtitle}>
            {data?.description} Repo{" "}
            <a href="https://github.com/phocks/phocks.vercel.app">here</a>. Feed{" "}
            <a href="/feed.json">here</a>. Uses{" "}
            <a href="https://www.jsonfeed.org/">JSON Feed</a> for syndication.
          </div>
          <div className={styles.posts}>
            {items?.map((item, iteration) => {
              const { date_published, content_text } = item;

              return (
                <div className={styles.item} key={iteration}>
                  <div className={styles.date}>
                    <abbr title={date_published}>
                      {dayjs(date_published).fromNow()}
                    </abbr>
                  </div>
                  {content_text}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
