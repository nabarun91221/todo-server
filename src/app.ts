import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/aut.middleware";
import { dtoValidation } from "./middleware/dto.validation.middleware.ts";
import { CreateTodoDto } from "./dto/createTodo.dto.ts";
import { CreateSectionDto } from "./dto/createSection.dto.ts";
import { plainToInstance } from "class-transformer";
import { ResponseSectionDto } from "./dto/responseSection.dto.interface.ts";
import { Section } from "./db/models/section.model.ts";
import { connectMongoose } from "./db/mongoos.ts";

const PORT = process.env.PORT || 8080;

const App = express();
App.use(express.json());
App.use(cookieParser());

const initializeTodoServer = async () => {
    try {
        await connectMongoose();
    } catch (err) {
        console.log({ msg: "something went wrong while connecting to mongoDb", err: err });
    }
    try {
        App.listen(PORT, () => {
            console.log("The todo-server has started on PORT:", PORT);
        })
    } catch (err) {
        console.log({ msg: "something went wrong while initializing server", err: err });
    }
}

initializeTodoServer();


App.get("/", (req, res) => {
    res.json({ msg: "your are on route '/'" })
})
const dummyuser = { user_id: "9", user_name: "Nabarun Middya", user_email: "nabarunmiddya@gmail.com" }
App.post("/createsection", dtoValidation(CreateSectionDto), async (req, res) => {
    try {
        const newSectionObj = req.body;;
        const newSectionObjFromDb: any = await Section.create({ user_id: dummyuser.user_id, ...newSectionObj });
        console.log(newSectionObjFromDb)
        const newSectionObjResponse: ResponseSectionDto = { id: newSectionObjFromDb?._id, section_title: newSectionObjFromDb?.section_title }
        console.log(newSectionObjResponse);
        res.json(newSectionObjResponse);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "something went wrong while creating section", err: err });
    }

})
App.patch("/updatesection:id", (req, res) => {
    const id = req.params.id;
})
App.delete("/deletesection:id", (req, res) => {
    const id = req.params.id;

})
App.post("/createtodo", (req, res) => {

})
App.patch("/updatetodo:id", (req, res) => {
    const id = req.params.id;
})
App.delete("/deletetodo:id", (req, res) => {
    const id = req.params.id;
})