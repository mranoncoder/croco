import Guest from "Components/Layouts/Guest";
import Image from "next/image";
import crocodileNFT from "images/crocodile-nft.png";
import styles from "styles/Pages/Mint.module.scss";
import { ISocialItem } from "types";
import { ChangeEvent, useState } from "react";
import ConnectWalletButton from "Components/Guest/Global/ConnectWalletButton";
import MintButton from "Components/Guest/Global/MintButton";

export default function Mint({ socials }: { socials: Array<ISocialItem> }) {
  const [editions, setEditions] = useState<number>(2);
  const MAX = 20;
  const MIN = 1;

  const increaseEditions = () => {
    if (editions <= 2){
      setEditions(editions => Math.min(MAX, editions + 1));
    }
  }
  const decreaseEditions = () => {
    setEditions(editions => Math.max(MIN, editions - 1));
  }

  const editionValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;
    let value = Number(el.value);
    if (isNaN(value)) return;
    if (value > MAX)
      value = MAX;
    if (value < MIN)
      value = MIN;

    setEditions(value);
  }

  return (
    <Guest socials={socials} title="Mint">
      <div className={styles.Mint}>
        <div className="row">
          <div className={["col-md-6", styles.ImageContainer].join(" ")}>
            <Image src={crocodileNFT} alt="Crocodile's NFT" />
          </div>
          <div className={["col-md-6", styles.FormContainer].join(" ")}>
            <div className={styles.ConnectWalletContainer}>
              <ConnectWalletButton />
              <div className={styles.Editions}>
                <div className={styles.LabelContainer}>
                  <label>Select Number of Editions</label>
                </div>
                <div className={styles.InputContainer}>
                  <button className={styles.MinusButton} onClick={decreaseEditions} disabled={editions === MIN}><i className="fa fa-minus" /></button>
                  <input type="text" className={styles.EditionCounter} value={editions} onChange={e => editionValueChange(e)} />
                  <button className={styles.PlusButton} onClick={increaseEditions} disabled={editions === MAX}><i className="fa fa-plus" /></button>
                </div>
              </div>
            </div>

            <div >
              <MintButton  editions={editions}/>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Mint"
    }
  }
}
