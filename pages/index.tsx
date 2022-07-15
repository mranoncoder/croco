import Intro from "Components/Guest/Index/Intro";
import NFTs from "Components/Guest/Index/NFTs";
import Team from "Components/Guest/Index/Team";
import Roadmap from "Components/Guest/Index/Roadmap";
import Guest from "../Components/Layouts/Guest";
import Socials from "Components/Guest/Index/IndexSocials";
import { IEventItem, INFTItem, ISocialItem } from "types";

import crocodileNFT from "images/crocodile-nft.png";

export default function Home({ events, nfts, socials }: { events: Array<IEventItem>, nfts: Array<INFTItem>, socials: Array<ISocialItem> }) {
  return (
    <Guest socials={socials}>
      <Intro />
      <NFTs nfts={nfts} />
      <Roadmap events={events} />
      {/* <Team /> */}
      <Socials socials={socials} />
    </Guest>
  )
}

export async function getStaticProps() {
  const events: Array<IEventItem> = [
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus",
      month: "Soon",
      year: "",
      done: "100%",
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan",
      month: "December",
      year: "2022",
      done: "80%"
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus",
      month: "October",
      year: "2022",
      done: "60%"
    },
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Egestas purus",
      month: "August",
      year: "2022",
      done: "40%"
    },
    {
      description: "Starting our journey to THE MOON 🌒 We are F**** hungry to hunt ...",
      month: "July",
      year: "2022",
      done: "20%"
    }
  ];

  const nfts: Array<INFTItem> = [
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    },
    {
      title: "",
      image: crocodileNFT
    }

  ];

  return {
    props: {
      events,
      nfts
    }
  }
}