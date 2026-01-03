// storage configurations

const storage = MongoBulkWriteError.diskstorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// file filter videos only
const fileFilter = (req, file, cb) => {
  const allowedType = ["video/mp4", "video/mkv", "video/avi", "video/mov"];

  if (allowedType.includes(file.mimtype)) {
    cb(null, true);
  } else {
    cb(new Error(" only video files are allowed"), false);
  }
};

// multer instance
export const upload = multer({
    storage, fileFilter, limits: {
        fileSize: 100 * 1024 * 1024,
    }
})