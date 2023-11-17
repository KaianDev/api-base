import { Request, Response, Router } from "express";
import multer from "multer";
import { AuthorController } from "./controllers/author.controller";
import { PostController } from "./controllers/post.controller";
import { UserController } from "./controllers/user.controller";
import { auth } from "./middlewares/auth";

const router = Router();

const storageConfig = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./tmp");
    },
    filename(req, file, callback) {
        const random = Math.floor(Math.random() * 99999);
        callback(null, `filename_${random + Date.now()}`);
    },
});

const upload = multer({
    storage: storageConfig,
    fileFilter(req, file, callback) {
        const allowed = ["image/jpg", "image/jpeg", "image/png"];
        callback(null, allowed.includes(file.mimetype));
        console.log(file);
    },
    limits: {
        fieldSize: 3000000, // 3Mb
    },
});

const authorController = new AuthorController();
const postController = new PostController();
const userController = new UserController();

router.get("/", (req: Request, res: Response) => {
    res.json("Bem vindo a API");
});

//recebendo um arquivo via single
router.post("/author", upload.single("avatar"), authorController.create);
router.get("/author", upload.single("avatar"), authorController.list);
router.get("/author/:id", upload.single("avatar"), authorController.getAuthor);
router.delete("/author/:id", upload.single("avatar"), authorController.remove);

router.post("/post", auth.private, postController.create);
router.get("/post", postController.list);
router.delete("/post/:id", postController.remove);
router.get("/post/:id", postController.getPost);
router.get("/post/count", postController.count);

router.post("/user", userController.create);
router.post("/login", userController.login);

//recebendo varios arquivos via array
/* router.post(
    "/uploads",
    upload.array("photos", 2),
    (req: Request, res: Response) => {
        console.log(req.files);

        res.json({});
    }
);

//recebendo varios arquivos via fields
router.post(
    "/uploads-v",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "gallery",
            maxCount: 3,
        },
    ]),
    (req: Request, res: Response) => {
        const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
        };

        console.log("Avatar", files.avatar);
        console.log("Gallery", files.gallery);

        res.json({});
    }
); */

export default router;
