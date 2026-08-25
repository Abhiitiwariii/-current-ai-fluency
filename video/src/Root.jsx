import React from "react";
import { Composition } from "remotion";
import { PersonaExplainer } from "./PersonaExplainer";
import { JOB_ORDER } from "./data";

// One composition per persona so each renders by id, e.g.
//   npx remotion render src/index.jsx marketing out/marketing.mp4
export const Root = () => {
  return (
    <>
      {JOB_ORDER.map((job) => (
        <Composition
          key={job}
          id={job}
          component={PersonaExplainer}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ job }}
        />
      ))}
    </>
  );
};
