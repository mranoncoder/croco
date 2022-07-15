import Socials from "./Partials/Socials";
import styles from "styles/Components/Guest/Layout/Footer.module.scss";
import Logo from "./Partials/Logo";
import Nav from "./Partials/Nav";
import { ISocialItem } from "types";

export default function Footer({ socials }: { socials: Array<ISocialItem> }) {
  return <footer className={styles.Footer}>
    <div>
      <Logo />
    </div>
    <div>
      <Nav />
    </div>
    <div>
      <Socials socials={socials} />
    </div>
    {/* <div className={styles.DesignerNote}>
      Designed with <i className="fa fa-heart" /> by <a href="https://tarbor.me" target="_blank">Ali Tarbor</a>
    </div> */}
  </footer>
}