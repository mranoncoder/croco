import ourTeamIcon from "images/icons/our-team.svg";
import styles from "styles/Components/Guest/Index/Team.module.scss";
import TeamMember from "./Partials/TeamMember";
import SectionHeader from "../Global/SectionHeader";
import { ITeamMember } from "types";
import { useEffect, useState } from "react";

import member1 from "images/avatars/member-1.jpg";
import member2 from "images/avatars/member-2.jpg";
import member3 from "images/avatars/member-3.jpg";
import member4 from "images/avatars/member-4.jpg";


export default function Team() {
  const teamMembers: Array<ITeamMember> = [
    {
      title: "John Snow",
      role: "Web Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
      avatar: member1,
      instagramLink: "https://instagram.com/username/",
      facebookLink: "https://facebook.com/username",
      twitterLink: "https://twitter.com/CrocokingNFT?t=P4VRbqOM5hy8EGdNIqUJSg&s=09"
    },
    {
      title: "Anne Sherman",
      role: "3D Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
      avatar: member2,
      instagramLink: "https://instagram.com/username/",
      facebookLink: "https://facebook.com/username",
      twitterLink: "https://twitter.com/CrocokingNFT?t=P4VRbqOM5hy8EGdNIqUJSg&s=09"
    },
    {
      title: "Jack Morophy",
      role: "Web Developer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
      avatar: member3,
      instagramLink: "https://instagram.com/username/",
      facebookLink: "https://facebook.com/username",
      twitterLink: "https://twitter.com/CrocokingNFT?t=P4VRbqOM5hy8EGdNIqUJSg&s=09"
    },
    {
      title: "Robert Deniro",
      role: "Cover Art",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
      avatar: member4,
      instagramLink: "https://instagram.com/username/",
      facebookLink: "https://facebook.com/username",
      twitterLink: "https://twitter.com/CrocokingNFT?t=P4VRbqOM5hy8EGdNIqUJSg&s=09"
    },
  ];

  const [fadeInCounter, setFadeInCounter] = useState<number>(-1);

  useEffect(() => {
    const handleScroll: () => void = () => {
      const element = document.querySelector(`#team`) as HTMLElement;
      if (!element)
        return;
      const windowScreenEnd = window.scrollY + window.innerHeight;
      if (windowScreenEnd < element.offsetTop) {
        setFadeInCounter(-1);
        return;
      }
      if (windowScreenEnd > element.offsetTop + element.offsetHeight) {
        setFadeInCounter(teamMembers.length);
        return;
      }
      const counterChangeSize = element.offsetHeight / teamMembers.length;
      const counter = Math.floor((windowScreenEnd - element.offsetTop) / counterChangeSize);
      if (counter !== fadeInCounter)
        setFadeInCounter(counter);
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, []);

  return <section id="team" className={styles.Team}>
    <SectionHeader icon={ourTeamIcon}>
      Our <span className="text-primary">Team</span>
    </SectionHeader>
    <div className={[styles.TeamMembers, "row"].join(" ")}>
      {teamMembers.map((member, idx) => {
        const transition = {
          transition: `all 0.4s`
        };
        const fadedOut = {
          transform: `translate(0, 100%)`,
          opacity: "0",
          ...transition
        };

        return <TeamMember key={JSON.stringify(member)} {...member} style={fadeInCounter <= idx ? fadedOut : transition} />
      })}
    </div>
  </section>
}