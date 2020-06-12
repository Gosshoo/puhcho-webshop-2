import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://bit.ly/37lJliE',
    altText: 'Entrance',
    caption: 'Entrance'
  },
  {
    src: 'https://bit.ly/2AWrhj2',
    altText: 'For kids to play',
    caption: 'For kids to play'
  },
  {
    src: 'https://bit.ly/3fbRsRC',
    altText: 'toys',
    caption: 'toys'
  },
  {
    src: 'https://bit.ly/30tNBeF',
    altText: 'toys',
    caption: 'toys'
  },
  {
    src: 'https://bit.ly/30yLDKa',
    altText: 'toys',
    caption: 'toys'
  }
];

const Slider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-100" 
             style={{paddingTop:"25px", paddingLeft:"40px", paddingRight:"40px", height:"820px", borderRadius:"90px"}} 
             src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slider;