import { FC, useEffect } from "react";
import useElementsOnScreen from "../hooks/use-elements-on-screen";

import Welcome from '../components/welcome/welcome';
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

    // Clear the current array and push new elements
    sectionRefs.current!.length = 0; // Clear the array
    sectionRefs.current!.push(...sections); // Add new elements
  }, [sectionRefs]);

  return (
    <main>
      <Welcome />
      <Hero />
    </main>
  );
}

export default Main;
