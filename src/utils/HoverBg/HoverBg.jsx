import React, {useEffect, useState} from "react";
import "./style.css";
const LightHoverbg = () => {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({x: e.clientX - 400, y: e.clientY - 400}); // Adjust to center around cursor
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className='lg-container'>
      <div
        className='w-[800px] h-[800px] absolute transform-gpu'
        style={{
          transition: "transform 0.2s ease 0s",
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <span
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: 0,
            margin: 0,
            padding: 0,
            position: "relative",
            maxWidth: "100%",
          }}
        >
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: 0,
              margin: 0,
              padding: 0,
              maxWidth: "100%",
            }}
          >
            {/* Placeholder SVG */}
            <img
              style={{
                display: "block",
                maxWidth: "100%",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
              }}
              alt=''
              aria-hidden='true'
              src='https://b2b.onesoil.ai/_next/image?url=%2Fsvgs%2Fbg.png&w=828&q=75'
            />
          </span>
          {/* Actual Image */}

          <img
            alt=''
            src='/svgs/bg.png'
            width={1920}
            height={1920}
            quality={75}
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              inset: 0,
              bottom: 0,
              right: 0,
              boxSizing: "border-box",
              padding: 0,
              border: "none",
              margin: "auto",
              display: "block",
              width: "0",
              height: "0",
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
          />
        </span>
      </div>
      ////////////////////////////////////////////
      <div className='w-[180%] sm:w-[115%] -ml-[40%] sm:-ml-[7.5%] -mt-[15vh] md:-mt-[50%] overflow-hidden -mb-[10px] bg-[#fff]'>
        <span
          style={{
            boxSizing: "border-box",
            display: "block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: 0,
            margin: 0,
            padding: 0,
            position: "relative",
          }}
        >
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: 0,
              margin: 0,
              padding: 0,
              paddingTop: "92.5%",
            }}
          />
          <img
            alt=''
            sizes='100vw'
            srcSet='https://b2b.onesoil.ai https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 640w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 750w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 828w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 1080w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 1200w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 1920w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 2048w, https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg 3840w'
            src='https://res.cloudinary.com/dbzn1y8rt/image/upload/v1739999853/vuu4ozvpmztfygbw8hyo.svg'
            decoding='async'
            data-nimg='responsive'
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              boxSizing: "border-box",
              padding: 0,
              border: "none",
              margin: "auto",
              display: "block",
              width: 0,
              height: 0,
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default LightHoverbg;
