import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import type { AppProps as NextAppProps } from "next/app";
import { getLibrary } from '../utils/web3-react'
import Web3ReactManager from '../utils/web3ReactManager'
import 'styles/globals.scss';
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { store } from '../state'

import twitterIcon from "images/icons/twitter.svg";
import discordIcon from "images/icons/discord.svg";
// import instagramIcon from "images/icons/instagram.svg";

import discordImage from "images/intro/discord.png";
// import instagramImage from "images/intro/instagram.png";
import twitterImage from "images/intro/twitter.png";

import { ISocialItem } from "types";
import Head from "next/head";



type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();


  useEffect(() => {
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => {
      NProgress.done();
    }

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, [router.events]);


  const socials: Array<ISocialItem> = [
    {
      link: "https://www.discord.com/username",
      media: "Discord",
      icon: discordIcon,
      image: discordImage
    },
    // {
    //   link: "https://www.instagram.com/username/",
    //   media: "Instagram",
    //   icon: instagramIcon,
    //   image: instagramImage
    // },
    {
      link: "https://twitter.com/CrocokingNFT?t=P4VRbqOM5hy8EGdNIqUJSg&s=09",
      media: "Twitter",
      icon: twitterIcon,
      image: twitterImage
    },
    // {
    //   link: "https://facebook.com/username",
    //   media: "Facebook",
    //   icon: facebookIcon,
    //   image: facebookImage
    // },
    // {
    //   link: "https://linkedin.com/username",
    //   media: "LinkedIn",
    //   icon: linkedinIcon,
    //   image: linkedinImage
    // }
  ];


  return <>
    <Head>
      <title>{"Crocodile NFTs" + (pageProps.title ? ` - ${pageProps.title}` : "")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>

        <Web3ReactManager>
      <Component socials={socials} {...pageProps} />
        </Web3ReactManager>
      </Web3ReactProvider>
    </Provider>
  </>
}