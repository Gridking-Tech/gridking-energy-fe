import React, { useState } from "react";
import VideoPlaceholder from "./Placeholders/VideoPlaceholder";

function About() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="mt-20 w-full relative h-[80%] flex  flex-col justify-center">
      <div className="text-black font-black text-2xl  md:text-5xl text-center md:mb-10">
        GRIDKING EXPERT GUIDE
      </div>

      <div className="bg- w-[100%]   md:w-[100%] mx-auto p-4 md:py-0 ">
        {!isVideoLoaded && <VideoPlaceholder width="100%" height="500px" />}
        <iframe
          width="100%"
          height="500px"
          src="https://www.youtube.com/embed/p6hukTvPzfU?autoplay=1&mute=1&modestbranding=1&rel=0&playsinline=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsVideoLoaded(true)}
          style={{ display: isVideoLoaded ? "block" : "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default About;
