import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ContinuousScrollWrap
} from "./scroll-x-carousel";

const EXISTING_IMAGES = [
  '/showcase-images/33.png',
  '/showcase-images/34.png',
  '/showcase-images/35.png',
  '/showcase-images/36.png',
  '/showcase-images/37.png',
  '/showcase-images/38.png',
  '/showcase-images/43.png',
];

// Repeat to ensure the marquee has enough images to loop infinitely without gaps
const IMAGES = [
  ...EXISTING_IMAGES,
  ...EXISTING_IMAGES,
  ...EXISTING_IMAGES,
  ...EXISTING_IMAGES,
];

export function ImageShowcase() {
  return (
    <ScrollXCarousel className="w-full bg-cloud py-12 md:py-24 h-auto">
      <ScrollXCarouselContainer className="relative place-content-center flex flex-col space-y-4 md:space-y-8 !sticky max-h-none h-auto">
        
        <ContinuousScrollWrap
          baseVelocity={-0.01}
          className="relative flex gap-4 md:gap-8 pr-4 md:pr-8"
        >
          {IMAGES.map((imageUrl, index) => (
            <div
              className="w-[60vw] md:w-[42vw] aspect-video overflow-hidden rounded-md flex-shrink-0"
              key={index}
            >
              <img
                alt="agency showcase"
                src={imageUrl}
                className="size-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </ContinuousScrollWrap>
        
        <ContinuousScrollWrap
          baseVelocity={0.01}
          className="relative flex gap-4 md:gap-8 pr-4 md:pr-8 pl-12 md:pl-24"
        >
          {[...IMAGES].reverse().map((imageUrl, index) => (
            <div
              className="w-[60vw] md:w-[42vw] aspect-video overflow-hidden rounded-md flex-shrink-0"
              key={index}
            >
              <img
                alt="agency showcase"
                src={imageUrl}
                className="size-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </ContinuousScrollWrap>
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  );
}
