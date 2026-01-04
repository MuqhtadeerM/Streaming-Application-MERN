// Easy to replace mock logic with ML later

import Video from "../models/video.model.js";

export const processVideo = async (videoId) => {
  try {
    // mark video as processing
    await Video.findByIdAndUpdate(videoId, {
      status: "processing",
    });

    // simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // mock sensitivity logic
    const sensitivityResult = Math.random() > 0.2 ? "safe" : "flagged";

    // update final status
    await Video.findByIdAndUpdate(videoId, {
      status: "processed",
      sensitivity: sensitivityResult,
    });

    console.log(
      `Video ${videoId} processed → sensitivity: ${sensitivityResult}`
    );
  } catch (error) {
    console.log("Processing Failed", error);
    await Video.findByIdAndUpdate(videoId, {
      status: "failed",
    });
  }
};
