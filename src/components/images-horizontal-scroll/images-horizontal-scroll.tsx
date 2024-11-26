import { FC, useEffect } from "react";
import useElementsOnScreen from "../../hooks/use-elements-on-screen";
import './images-horizontal-scroll.scss';

interface IImagesHorizontalScrollProps {
  imageURLs: string[];
}

const ImagesHorizontalScroll: FC<IImagesHorizontalScrollProps> = ({ imageURLs }) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const imgContainerRefs = useElementsOnScreen(options);

  useEffect(() => {
    // Get all sections with the class 'image-container'
    const imgContainers = Array.from(document.querySelectorAll('.horizontal-scroll-image-container')) as HTMLElement[];

    imgContainerRefs.current!.length = 0;
    imgContainerRefs.current!.push(...imgContainers);
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
                index !== 0 &&
                <button key={`btn-left-${index}`} type="button" className="btn btn-scroll --left btn-transparent" onClick={() => handleScroll('left')}>
                  <img src="/src/assets/icons/left-btn-icon.svg" alt="img-left-icon" />
                  </button>
              }
              <img key={`img-${index}`} src={imageURL} alt="Image" />
              {
                index !== imageURLs.length - 1 && 
                <button key={`btn-right-${index}`} type="button" className="btn btn-scroll --right btn-transparent" onClick={() => handleScroll('right')}>
                  <img src="/src/assets/icons/right-btn-icon.svg" alt="img-right-icon" />
                </button>
              }
            </div>
          ))
        }
      </div>
    </section>
  );
}


export default ImagesHorizontalScroll
