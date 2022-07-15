import styles from "styles/Components/Guest/Layout/Partials/Socials.module.scss";
import SocialItem from "./Socials/SocialItem";
import { ISocialItem } from "types";
import Image from "next/image";

/*{socials.map(social => (

  <li key={social.media}>
    <SocialItem {...social} />
  </li>
))}*/
export default function Socials({ socials }: { socials: Array<ISocialItem> }) {
  return <ul className={styles.Socials}>

    <li key={socials[1].media}>
      <a href={socials[1].link} target="_blank">
        <span className="sr-only">{socials[1].media}</span>
        <Image src={socials[1].icon} />
      </a>
    </li>
  </ul>
}
