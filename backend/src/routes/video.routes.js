import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// video
router.post("/upload", authMiddleware, );
