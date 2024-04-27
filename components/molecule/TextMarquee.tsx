import React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks";
import { gsap } from "../../lib/gsap";
import { brands } from "../../constants";

const TextMarquee = () => {
  useIsomorphicLayoutEffect(() => {
    const wrapper = document.querySelector(".wrapper");

    const boxes = gsap.utils.toArray(".brand");

    const loop = horizontalLoop(boxes, {
      paused: false,
      repeat: -1,
      speed: 0.7,
    });

    function horizontalLoop(items: any, config: any) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: (): any =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: any = [],
        widths: any = [],
        xPercents: any = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 70,
        snap =
          config.snap === false ? (v:any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(
            gsap.getProperty(el, "width", "px") as string
          ));
          xPercents[i] = snap(
            parseFloat(gsap.getProperty(el, "x", "px") as string) /
              parseInt((w * 100) as any) +
              parseInt(gsap.getProperty(el, "xPercent") as string)
          );
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          parseInt(gsap.getProperty(items[length - 1], "scaleX") as string) +
        (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * parseInt(gsap.getProperty(item, "scaleX") as string);
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index: any, vars: any) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          // if we're wrapping the timeline's playhead, make the proper adjustments
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars: any) => toIndex(curIndex + 1, vars);
      tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index: any, vars: any) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl!.vars?.onReverseComplete!();
        tl.reverse();
      }
      return tl;
    }
  }, []);

  return (
    <div className="wrapper textmarquee relative flex gap-[26px] top-20 items-center z-[8] h-10 w-full border-b border-[#000] bg-[#fff] overflow-hidden">
      {brands.map((brand, index) => (
        <p
          className={`text-black-100 text-[12px] w-full whitespace-nowrap brand`}
          key={index}
        >
          {brand}
        </p>
      ))}
    </div>
  );
};

export default TextMarquee;
