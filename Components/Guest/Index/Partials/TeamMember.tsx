import Image from "next/image";
// import instagramLogo from "images/icons/instagram-logo.svg";
import facebookLogo from "images/icons/facebook-logo.svg";
import twitterLogo from "images/icons/twitter-logo.svg";
import styles from "styles/Components/Guest/Index/Partials/TeamMember.module.scss";
import { ITeamMember } from "types";

export default function TeamMember(props: ITeamMember & { style: any }) {

  return <div className={[styles.TeamMemberContainer, "col-lg-3 col-sm-6 col-12 mb-3"].join(" ")} style={props.style}>
    <div className={styles.TeamMemberOutline}>
      <div className={styles.TeamMember}>
        <div className={styles.ImageContainer}>
          <Image src={props.avatar} width={200} height={200} />
        </div>
        <h3>{props.title}</h3>
        <label>{props.role}</label>
        <p>{props.description}</p>
        <div className={styles.Socials}>
          {/* {props.instagramLink ? (
            <a href={props.instagramLink} target="_blank">
              <Image src={instagramLogo} />
            </a>
          ) : ""} */}
          {props.facebookLink ? (
            <a href={props.facebookLink} target="_blank">
              <Image src={facebookLogo} />
            </a>
          ) : ""}
          {props.twitterLink ? (
            <a href={props.twitterLink} target="_blank">
              <Image src={twitterLogo} />
            </a>
          ) : ""}
        </div>
      </div>
    </div>
  </div>
}