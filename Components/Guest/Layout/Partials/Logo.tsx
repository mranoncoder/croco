import styles from "styles/Components/Guest/Layout/Partials/Logo.module.scss";
import Image from "next/image";
import logo from "/images/logo.png";

export default function Logo() {
  return <a href="/">
    <span className={styles.LogoText}><span style={{color:"#3dc1df"}}>C</span>K</span >
    {/* <Image src={logo} width={80} height={70} /> */}
    {/* ! Comment in previous line to see sample logo ! */}
  </a>
}