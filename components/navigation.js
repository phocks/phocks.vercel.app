import Link from "next/link";
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  return (
    <div className={styles.root}>
      <Link href={"/"}>Home</Link> &middot; <Link href={"/timeline"}>Timeline</Link>
    </div>
  );
}
