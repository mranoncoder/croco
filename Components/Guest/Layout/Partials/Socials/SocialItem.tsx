import Image from 'next/image';
import { ISocialItem } from 'types';

export default function SocialItem(props: ISocialItem) {
  return <a href={props.link} target="_blank">
    <span className="sr-only">{props.media}</span>
    <Image src={props.icon} />
  </a>
}