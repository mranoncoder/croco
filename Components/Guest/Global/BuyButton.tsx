import styles from "@styles/Components/Guest/Global/ConnectWalletButton.module.scss";
import Image from "next/image";
import buyIcon from "/images/icons/buy.svg";

export default function BuyButton(props) {
    return (
        <button className={[styles.ConnectWalletButton, props.className].join(' ')}>
            <span>
              <Image src={buyIcon}/>
              Buy
            </span>
        </button>
    );
}