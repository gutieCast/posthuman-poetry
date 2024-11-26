import { FC } from "react";
interface IAudioPlayerProps {
  imgCoverAudio?: string;
  url: string;
};
import './audio-player.scss'

const AudioPlayer: FC<IAudioPlayerProps> = ({imgCoverAudio, url}) => {
    return (
        <div className="audio-frame">
          {/* <iframe style={{borderRadius:'12px'}} src={url} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" ></iframe> */}
          <a href={url} target="_blank">
            <img src={imgCoverAudio} alt="Cover audio" />
          </a>
        </div>
    );
}

export default AudioPlayer;