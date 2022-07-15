import ourCharactersIcon from "images/icons/our-characters-icon.svg";
import styles from "styles/Components/Guest/Index/NFTs.module.scss";
import NFTItem from "./Partials/NFTItem";
import SectionHeader from "../Global/SectionHeader";
import { INFTItem } from "types";
import { useEffect, useState } from "react";


export default function NFTs({ nfts }: { nfts: Array<INFTItem> }) {
  const [fadeInCounter, setFadeInCounter] = useState<number>(-1);

  useEffect(() => {
    const handleScroll: () => void = () => {
      const element = document.querySelector(`#nfts`) as HTMLElement;
      if (!element)
        return;
      const windowScreenEnd = window.scrollY + window.innerHeight;
      if (windowScreenEnd < element.offsetTop) {
        setFadeInCounter(-1);
        return;
      }
      if (windowScreenEnd > element.offsetTop + element.offsetHeight) {
        setFadeInCounter(nfts.length);
        return;
      }
      const counterChangeSize = element.offsetHeight / (nfts.length + 1);
      const counter = Math.floor((windowScreenEnd - element.offsetTop) / counterChangeSize);
      if (counter !== fadeInCounter)
        setFadeInCounter(counter);
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, []);


  return <section id="nfts" className={styles.NFTs}>
    <SectionHeader icon={ourCharactersIcon}>
      Our <span className="text-primary">Characters</span>
      <span style={{fontSize: "30px"}}> (wait to hunt ...)</span>
    </SectionHeader>
    <div className="row">
      {nfts.map((nft, idx) => {
        const transition = {
          transition: `all 0.3s`
        };
        const fadedOut = {
          transform: `translate(-${100 * (idx + 1)}%, 0)`,
          opacity: "0",
          ...transition
        };
        return <NFTItem key={JSON.stringify(nft)} {...nft} style={fadeInCounter <= idx ? fadedOut : transition} />
      })}
    </div>
  </section>
}