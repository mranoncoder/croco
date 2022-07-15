import introCrocodile from "images/intro/Crocodile.png";
import introCould from "images/intro/Cloud.png";
import introBlur from "images/intro/blur-on-crocodile.png";
import styles from "styles/Components/Guest/Index/Intro.module.scss";
import Image from "next/image";

export default function Intro() {

  return <section id="intro" className={styles.Intro}>
    <div className={styles.Background}>
      <div className={styles.CrocodileImage}>
        <Image src={introCrocodile} />
      </div>
      <div className={styles.TopClouds}>
        <Image src={introCould} />
      </div>
      <div className={styles.Blurs}>
        <Image src={introBlur} />
      </div>
    </div>
    <div className={styles.DescriptionContainer}>
      <h1>Croco <span className="text-primary">King</span></h1>
      <p className="px-lg-5 px-md-4 px-sm-3 p-2" style={{fontSize:"25px",marginLeft:"18px" }}>
        Who's hungry?
      </p>
    </div>
  </section>
}