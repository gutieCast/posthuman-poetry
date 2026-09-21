import { FC, useEffect, useRef } from "react";
import './audio-player.scss';

interface IAudioPlayerProps {
  imgCoverAudio?: string;
  url: string;
}

const AudioPlayer: FC<IAudioPlayerProps> = ({ imgCoverAudio, url }) => {
  const audioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(currentAudio);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={audioRef} className="audio-frame">
      {/* <iframe style={{borderRadius:'12px'}} src={url} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" ></iframe> */}
      <a href={url} target="_blank" rel="noreferrer">
        <img src={imgCoverAudio} alt="Cover audio" />
      </a>
    </div>
  );
};

export default AudioPlayer;