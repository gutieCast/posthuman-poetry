import { FC, useEffect } from "react";
import useElementsOnScreen from "../../hooks/use-elements-on-screen";
import './images-horizontal-scroll.scss';

interface IImagesHorizontalScrollProps {
  imageURLs: string[];
}

import iconLeft from "../../assets/icons/left-btn-icon.svg";
import iconRight from "../../assets/icons/right-btn-icon.svg";

const ImagesHorizontalScroll: FC<IImagesHorizontalScrollProps> = ({ imageURLs }) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const imgContainerRefs = useElementsOnScreen(options, true); // Pass true to only mark first element as visible

  useEffect(() => {
    // Get all sections with the class 'image-container'
    const imgContainers = Array.from(document.querySelectorAll('.horizontal-scroll-image-container')) as HTMLElement[];

    imgContainerRefs.current!.length = 0;
    imgContainerRefs.current!.push(...imgContainers);

    // Add scroll listener to update visibility on horizontal scroll
    const container = document.querySelector('.section-content.--horizontal-scroll') as HTMLElement;

    const handleScrollUpdate = () => {
      if (!imgContainerRefs.current) return;

      // Find the first visible image container
      let firstVisibleElement: HTMLElement | null = null;

      for (const ref of imgContainerRefs.current) {
        const rect = ref.getBoundingClientRect();
        // Check if element is in viewport (more than 50% visible)
        if (rect.left < window.innerWidth && rect.right > 0) {
          firstVisibleElement = ref;
          break;
        }
      }

      // Update classes
      imgContainerRefs.current.forEach(ref => {
        if (ref === firstVisibleElement) {
          ref.classList.add("is-visible");
          ref.classList.remove("is-hidden");
        } else {
          ref.classList.remove("is-visible");
          ref.classList.add("is-hidden");
        }
      });
    };

    if (container) {
      container.addEventListener('scroll', handleScrollUpdate);
      // Initial call to set first image as visible
      handleScrollUpdate();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScrollUpdate);
      }
    };
  }, [imgContainerRefs]);

  const handleScroll = (side: 'left' | 'right') => {
    const container = document.querySelector('.section-content.--horizontal-scroll') as HTMLElement;
    if (side === 'left') {
      container.scrollLeft -= container.offsetWidth;
    }
    if (side === 'right') {
      container.scrollLeft += container.offsetWidth;
    }
    console.log('container.offsetWidth', container.offsetWidth);
    
    console.log('container.scroll: ', container.scrollLeft);
  }

  return (
    <section className="section horizontal-scroll" >
      <div className="section-content --horizontal-scroll">
        {
          imageURLs.map((imageURL, index) => (
            <div key={`img-geo-${index}`} className="horizontal-scroll-image-container">
              {
                index !== 0 
                ?
                <button key={`btn-left-${index}`} type="button" className="btn btn-scroll --left btn-transparent" onClick={() => handleScroll('left')}>
                  <img src={ iconLeft } alt="img-left-icon" />
                </button>
                :
                <button className="btn btn-transparent"></button>
              }
              <img key={`img-${index}`} src={imageURL} alt="Image" />
              {
                index !== imageURLs.length - 1 
                ? 
                <button key={`btn-right-${index}`} type="button" className="btn btn-scroll --right btn-transparent" onClick={() => handleScroll('right')}>
                  <img src={ iconRight } alt="img-right-icon" />
                </button>
                :
                <button className="btn btn-transparent"></button>
              }
            </div>
          ))
        }
      </div>
    </section>
  );
}


export default ImagesHorizontalScroll
