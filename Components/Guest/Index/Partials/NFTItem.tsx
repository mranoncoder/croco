import Image from "next/image";
import styles from "styles/Components/Guest/Index/Partials/NFTItem.module.scss";
import { INFTItem } from "types";

export default function NFTItem(props: INFTItem & { style: object }) {

  return <div className="col-lg-3 col-md-4 col-sm-6 m-auto mb-3" style={{ maxWidth: '400px', ...props.style }}>
    <div className={styles.Item}>
      <div>
        <Image src={props.image} width={400} height={278} />
      </div>
      <h3>{props.title}</h3>
    </div>
  </div>
}