import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import useSWR from "swr";
import * as dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import styles from "../styles/Home.module.css";

const Posts = () => {};

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/feed.json", fetcher);

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
            <a href="https://github.com/phocks/phocks.vercel.app">here</a>.
          </div>
          <div className={styles.posts}>
            {items?.map((item, iteration) => {
              const { date_published, content_text } = item;

              return (
                <div className={styles.item} key={iteration}>
                  <div className={styles.date}>
                    {dayjs(date_published).fromNow()}
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
