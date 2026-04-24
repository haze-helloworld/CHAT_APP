import arcjet, { detectBot, shield, slidingWindow} from "@arcjet/node";
import {ENV} from './env.js';

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    // Create a sliding window rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60, // 1 minute
    }),
  ],
});

export default aj;