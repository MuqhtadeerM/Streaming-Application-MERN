// import multer from "multer";

// // storage configurations
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // file filter videos only
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];

//   // Only apply filter to the 'video' field
//   if (file.fieldname === "video") {
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only video files are allowed"), false);
//     }
//   } else {
//     // Allow other fields (like title, description) to pass through
//     cb(null, true);
//   }
// };

// // multer instance
// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 100 * 1024 * 1024,
//     fields: 10,
//   },
// });

import fileUpload from "express-fileupload";

export const upload = fileUpload({
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  useTempFiles: false,
  abortOnLimit: true,
});
