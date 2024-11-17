import { FC, useEffect } from "react";
import useElementsOnScreen from "../hooks/use-elements-on-screen";

import InitialScene from "../components/initial-scene/initial-scene";
import Hero from '../components/hero/hero';
import "../assets/styles/styles.scss";

const Main: FC = () => {
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

  return (
    <main>
      <InitialScene />
      <Hero />
    </main>
  );
}

export default Main;
