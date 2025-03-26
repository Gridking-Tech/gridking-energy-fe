import React from 'react';

function About() {
  return (
    <div className="mt-20 w-full h-[80%] flex  flex-col justify-center">
      <div className="text-black font-black text-3xl  md:text-5xl text-center mb-10">
        About GridKing
      </div>

      <div className="bg- w-[100%]  md:w-[80%] mx-auto p-4 md:py-6 ">
        <iframe
          width="100%"
          height="500px"
          src="https://www.youtube.com/embed/Yxt72aDjFgY?autoplay=1&mute=1&modestbranding=1&rel=0&playsinline=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen

        ></iframe>
      </div>
    </div>
  );
}

export default About;
