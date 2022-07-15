import BuyButton from "../Global/BuyButton";
import styles from 'styles/Components/Guest/Earn/SupplyInfoBox.module.scss'
import Image from 'next/image';
import horseImage from 'images/uniswap-logo.png';
import InfoItem from "./InfoItem";

export default function SupplyInfoBox(props) {
    return <div className="container-fluid mt-5">
        <div className={styles.SupplyInfoBox}>
            <div className={styles.Header}>
                <div className="row rtl">
                    <div className={[styles.ButtonContainer, 'col-lg-3 col-md-4 col-sm-6 mb-sm-0 mb-3'].join(' ')}>
                        <BuyButton onClick={props.onBuyClick} />
                    </div>
                    <div className={[styles.TitleContainer, 'col-lg-9 col-md-8 col-sm-6 ltr justify-content-center justify-content-sm-start'].join(' ')}>
                        <div className={styles.CircleImageContainer}>
                            <Image src={horseImage} />
                        </div>
                        <div className={styles.Title}>
                            <span>UNW</span>
                            <label>${props.unw}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.InfoContainer}>
                <InfoItem title="Max Supply" value={props.max} />
                <InfoItem title="Total Supply" value={props.total} />
                <InfoItem title="Circulating Supply" value={props.circulating} />
                <InfoItem title="Total Burned" value={props.burned} />
                <InfoItem title="Market Cap" value={'$' + props.marketCap} />
            </div>
        </div>
    </div>
}