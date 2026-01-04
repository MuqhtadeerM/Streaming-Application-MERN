import fileUpload from "express-fileupload";

export const upload = fileUpload({
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  useTempFiles: false,
  abortOnLimit: true,
});
