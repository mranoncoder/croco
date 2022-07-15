import styles from "@styles/Components/Guest/Global/UniswapMarketButton.module.scss";
import Image from "next/image";
import uniswapIcon from "/images/icons/uniswap.svg";

export default function UniswapMarketButton(props: {href: string}) {
    return (
        <a href={props.href} className={styles.UniswapMarketButton} target="_blank">
            {/* <span> */}
              {/* <Image src={uniswapIcon} /> */}
              Transaction
            {/* </span> */}
        </a>
    );
}