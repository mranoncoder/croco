import roadmapIcon from "images/icons/roadmap.svg";
import styles from "styles/Components/Guest/Index/Roadmap.module.scss";
import SectionHeader from "../Global/SectionHeader";
import EventItem from "./Partials/Roadmap/EventItem";
import { MutableRefObject, TouchEvent, useEffect, useRef, useState } from "react";
import { IEventItem } from "types";
import PercentageLines from "./Partials/Roadmap/PercentageLines";
import PercentageTexts from "./Partials/Roadmap/PercentageTexts";


export default function Roadmap({ events }: { events: Array<IEventItem> }) {
  const [fadeInStatus, setFadeInStatus] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll: () => void = () => {
      const element = document.querySelector(`#roadmap`) as HTMLElement;
      if (!element)
        return;
      const windowScreenEnd = window.scrollY + window.innerHeight;
      setFadeInStatus(windowScreenEnd > element.offsetTop + element.offsetHeight / 2);
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, []);


  const roadRef: MutableRefObject<any> = useRef();
  const eventsWidth = 310 * events.length; // width + margin
  const [eventsRight, setEventsRight] = useState(-30);
  const rightMax = () => {
    return roadRef.current?.offsetWidth - eventsWidth + 30;
  }
  const leftMax = () => {
    return -30;
  }

  const swipe = (size: number) => {
    setEventsRight(right => Math.max(rightMax(), Math.min(leftMax(), right + size)));
  }

  const scrollEventsRight = () => {
    swipe(-310);
  }
  const scrollEventsLeft = () => {
    swipe(310);
  }

  let [startX, setStartX] = useState(0);
  const touchStart = (e: TouchEvent) => {
    setStartX(e.targetTouches[0].clientX);
  };

  const touchMove = (e: TouchEvent) => {
    if (Math.abs(startX - e.changedTouches[0].clientX) > 310 / 3) {
      if (startX - e.changedTouches[0].clientX < 0) swipe(-310);
      else swipe(310);
      setStartX(e.targetTouches[0].clientX);
    }
  };

  const touchEnd = (e: TouchEvent) => {
    setStartX(0);
  };

  return <section id="roadmap" className={styles.Roadmap}>
    <SectionHeader icon={roadmapIcon}>
      Road <span className="text-primary">Map</span>
    </SectionHeader>
    <div className={styles.RoadmapContainer} style={{ opacity: fadeInStatus ? "1" : "0", transform: fadeInStatus ? "scale(1)" : "scale(0)" }}>
      <PercentageTexts />
      <div className={styles.TimeRoad}>
        <div
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          ref={roadRef} className={styles.Road}>
          <PercentageLines />
          <div
            className={styles.Events} style={{ right: `${eventsRight}px`, width: `${eventsWidth}px` }}>
            {events.map(event => <EventItem key={JSON.stringify(event)} {...event} />)}
          </div>
          <div className={styles.Scroller}>
            <button onClick={scrollEventsRight} disabled={rightMax() == eventsRight} className={styles.Left}><i className="fa fa-chevron-left" /></button>
            <button onClick={scrollEventsLeft} disabled={leftMax() == eventsRight} className={styles.Right}><i className="fa fa-chevron-right" /></button>
          </div>
        </div>
      </div>
    </div>
  </section>
}
