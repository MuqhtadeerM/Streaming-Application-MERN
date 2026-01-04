// Easy to replace mock logic with ML later

import Video from "../models/video.model.js";
import { emitProgress } from "./socket.service.js";

export const processVideo = async (videoId) => {
  try {
    // mark video as processing started
    await Video.findByIdAndUpdate(videoId, {
      status: "processing",
    });
    emitProgress(videoId, 10, "processing");

    // simulate analysis
    await new Promise((r) => setTimeout(r, 1500));
    emitProgress(videoId, 40, "processing");

    // simulate frame scanning
    await new Promise((r) => setTimeout(r, 1500));
    emitProgress(videoId, 70, "processing");

    // mock sensitivity logic
    const sensitivity = Math.random() > 0.2 ? "safe" : "flagged";

    // update final status
    await Video.findByIdAndUpdate(videoId, {
      status: "processed",
      sensitivity,
    });

    emitProgress(videoId, 100, "processed");

    console.log(`Video ${videoId} processed (${sensitivity})`);
  } catch (error) {
    console.log("Processing Failed", error);

    await Video.findByIdAndUpdate(videoId, { status: "failed" });
    emitProgress(videoId, 100, "failed");
  }
};
