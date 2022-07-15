import { useState } from "react";
import styles from "styles/Components/Guest/Layout/Header.module.scss";
import { ISocialItem } from "types";
import Logo from "./Partials/Logo";
import Nav from "./Partials/Nav";
import Socials from "./Partials/Socials";

export default function Header({ socials }: { socials: Array<ISocialItem> }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(mo => !mo);
  }

  return <header className={styles.Header}>
    <div className="row">
      <div className={[styles.Logo, "col-lg-2"].join(" ")}>
        <div className="row h-100">
          <div className="col-6 text-start d-lg-none">
            <button className={styles.Toggler} onClick={toggleMenu}>
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className="col-6 text-lg-start text-end">
            <Logo />
          </div>
        </div>
      </div>
      <div className="col-lg-10 col-12">
        <div className={[menuOpen ? styles.Open : "", "row h-100", styles.NavContainer].join(" ")}>
          <div className={styles.CloseContainer}>
            <button className={styles.Close} onClick={toggleMenu}>
              <i className="fa fa-2x fa-times" />
            </button>
          </div>
          <div className={[styles.Nav, "col-lg-9"].join(" ")}>
            <Nav onClick={() => setMenuOpen(false)} />
          </div>
          <div className={[styles.Socials, "col-lg-3"].join(" ")}>
            <Socials socials={socials} />
          </div>
        </div>
      </div>
    </div>
  </header>
}