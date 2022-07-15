import Image from "next/image";
import { ReactNode } from "react";
import styles from "styles/Components/Guest/Index/Partials/SectionHeader.module.scss";

export default function SectionHeader(props: { icon: string | StaticImageData, children: ReactNode }) {
  return <h2 className={styles.SectionHeader}>
    <div className={styles.ImageContainer}>
      <Image src={props.icon} />
    </div>
    <div>
      {props.children}
    </div>
  </h2>
}