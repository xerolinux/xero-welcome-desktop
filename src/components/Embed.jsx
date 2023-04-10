import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoEmbed = () => {
  return (
    <div className="row">
      <ReactPlayer url={"https://youtu.be/cUxDtW8Zddc"} />
    </div>
  );
};

export default VideoEmbed;
