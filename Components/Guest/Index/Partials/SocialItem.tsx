import Image from "next/image";
import styles from "styles/Components/Guest/Index/Partials/SocialItem.module.scss";
import Swal from "sweetalert2";

export default function SocialItem(props: { social: string, image: string | StaticImageData, link: string, style: any }) {

  const handleClick = () => {
    Swal.fire({
      text:'If you wanna hunt with us on discord, you should wait for our announcement on Twitter ...',
      showConfirmButton: false
    })
  }

  return <div className="col-md-6" style={props.style}>
    {props.link.includes('discord') ? <a style={{cursor:"pointer"}} className={[styles.Social, styles[props.social]].join(" ")} target="_blank" onClick={handleClick}>
      <div className={styles.NoteContainer}>
        <h3>
          Follow Us On
          <strong>{props.social}</strong>
        </h3>
        <span className={styles.Chevron}>
          <i className="fa fa-chevron-left" />
        </span>
      </div>
      <div className={styles.ImageContainer}>
        <Image src={props.image} width={320} height={320} />
      </div>
    </a>:
    <a href={props.link} className={[styles.Social, styles[props.social]].join(" ")} target="_blank">
      <div className={styles.NoteContainer}>
        <h3>
          Follow Us On
          <strong>{props.social}</strong>
        </h3>
        <span className={styles.Chevron}>
          <i className="fa fa-chevron-left" />
        </span>
      </div>
      <div className={styles.ImageContainer}>
        <Image src={props.image} width={320} height={320} />
      </div>
    </a>}

  </div>
}
