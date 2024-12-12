import { FC, useEffect } from "react";
import useElementsOnScreen from "../hooks/use-elements-on-screen";

import InitialScene from "../components/initial-scene/initial-scene.tsx";
import Hero from '../components/hero/hero.tsx';
import Epigraph from "../components/epigraph/epigraph.tsx";

import TextContent, { Content } from "../components/text-content/text-content";

import textContent from "../utils/content.json"
import image1 from '../assets/images/foto-extra-1-fuente-the-verge.png'
import imgEraG1 from '../assets/images/era-geologica-1.png'
import imgEraG2 from '../assets/images/era-geologica-2.png'
import imgEraG3 from '../assets/images/era-geologica-3.png'
import imgEraG4  from '../assets/images/era-geologica-4.png'
import imgEraG5  from '../assets/images/era-geologica-5.png'
import imgEraG6  from '../assets/images/era-geologica-6.png'

import '../assets/styles/styles.scss';
import ImagesHorizontalScroll from "../components/images-horizontal-scroll/images-horizontal-scroll";
import { FooterNav } from "../components/footer/footer";

const Report: FC = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sectionRefs = useElementsOnScreen(options);

  // Assign refs to each section
  useEffect(() => {
    // Get all sections with the class 'section'
    const sections = Array.from(document.querySelectorAll('.section')) as HTMLElement[];

    sectionRefs.current!.length = 0; // Clear the array
    sectionRefs.current!.push(...sections); // Add new elements
  }, [sectionRefs]);

  const imgEraGArray = [
    imgEraG1,
    imgEraG2,
    imgEraG3,
    imgEraG4,
    imgEraG5,
    imgEraG6
  ]

  const itemsMenuFooter = [
    { title: 'Especies de compañía', href: '/cronica', dir: 'right'  }
  ]

  return (
    <div className="poetry-sections-container">
      <InitialScene />
      <Hero />
      <Epigraph />
      <TextContent
        title={textContent.intro.title}
        theme="dark"
        content={textContent.intro.content as Content[]}
        childrenPositions={['before']}
      >
        <div className="bg-animate-container">
          <img src={image1} className="bg-animate" alt="photo dirty water" />
        </div>
      </TextContent>
      <TextContent title={textContent.posthumano.title} theme="light" content={textContent.posthumano.content  as Content[]} effect="transform" />
      <TextContent title={textContent.antropoceno.title} content={textContent.antropoceno.content as Content[]} effect="transform" />
      <ImagesHorizontalScroll imageURLs={imgEraGArray} ></ImagesHorizontalScroll>
      <TextContent title={textContent.ecos.title} theme="light" content={textContent.ecos.content as Content[]} effect="transform"  />
      <TextContent title={textContent.jessica.title} theme="light" content={textContent.jessica.content as unknown as Content[]} />
      <TextContent title={textContent.jessica2.title} content={textContent.jessica2.content as Content[]} />
      <TextContent title={textContent.edgar.title} theme="light" content={textContent.edgar.content as unknown as Content[]} />
      <TextContent title={textContent.edgar2.title} content={textContent.edgar2.content as unknown as Content[]} />
      <TextContent title={textContent.valeria.title} theme="light" content={textContent.valeria.content as unknown as Content[]} />
      <TextContent title={textContent.valeria2.title} content={textContent.valeria2.content as Content[]} />
      <TextContent title={textContent.lucia.title} theme="light" content={textContent.lucia.content as unknown as Content[]} />
      <TextContent title={textContent.lucia2.title} content={textContent.lucia2.content as Content[]} />
      <TextContent title={textContent.andres.title} theme="light" content={textContent.andres.content as unknown as Content[]} />
      <TextContent title={textContent.andres2.title} content={textContent.andres2.content as Content[]} />
      <TextContent title={textContent.ignacio.title} theme="light" content={textContent.ignacio.content as unknown as Content[]} />
      <TextContent title={textContent.ignacio2.title} content={textContent.ignacio2.content as Content[]} />
      <TextContent title={textContent.readers.title} theme="light" content={textContent.readers.content as unknown as Content[]} />
      <FooterNav items={itemsMenuFooter} ></FooterNav>
    </div>
  );
}

export default Report;