import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Components/Guest/Layout/Partials/Nav.module.scss";
import { INavItem } from "types";

export default function Nav({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const [asPath, setAsPath] = useState<string>(router.asPath);
  const navs: Array<INavItem> = [
    {
      link: "/",
      text: "Home"
    },
    {
      link: "/#nfts",
      text: "NFTs"
    },
    {
      link: "/#roadmap",
      text: "Roadmap"
    },
    // {
    //   link: "/#team",
    //   text: "Team"
    // },
    {
      link: "/mint",
      text: "Mint"
    },
    {
      link: "/earn",
      text: "Earn"
    }
  ];

  useEffect(() => {
    const ids: Array<string> = navs
      .filter(nav => nav.link.split("#").length > 1)
      .map(nav => nav.link);

    const handleScroll: () => void = () => {
      const currentIds = ids.filter(id => id.split("#")[0] === router.pathname).map(id => id.split("#")[1]);
      let activeId = null;
      let closest = 1000000;
      currentIds.forEach(id => {
        const element = document.querySelector(`#${id}`) as HTMLElement;
        if (!element)
          return;
        if (window.scrollY < element.offsetTop + element.offsetHeight - element.offsetHeight / 3) {
          const space = element.offsetTop - window.scrollY;
          if (space < closest && window.innerHeight / 2 > space) {
            closest = space;
            activeId = id;
          }
        }
      });
      if (activeId) {
        const path = `${router.pathname}#${activeId}`;
        setAsPath(path);
      }
      else {
        setAsPath(router.pathname);
      }
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, []);

  return <nav className={styles.Nav}>
    <ul>
      {navs.map(nav => (
        <li key={nav.text}>
          <Link href={nav.link}
            replace={nav.link.split("#").length > 1 && router.pathname === nav.link.split("#")[0]}>
            <a className={asPath === nav.link ? styles.Active : ""} onClick={onClick}>{nav.text}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
}