import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/aut.middleware";
import { dtoValidation } from "./middleware/dto.validation.middleware.ts";
import { CreateTodoDto } from "./dto/createTodo.dto.ts";
import { CreateSectionDto } from "./dto/createSection.dto.ts";
import { ResponseSectionDto } from "./dto/responseSection.dto.interface.ts";
import { Section } from "./db/models/section.model.ts";
import { connectMongoose } from "./db/mongoos.ts";
import { Todo } from "./db/models/todo.model.ts";
import { ResponseTodoDto } from "./dto/responseTodo.dto.interface.ts";

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


const dummyuser = { user_id: "9", user_name: "Nabarun Middya", user_email: "nabarunmiddya@gmail.com" }


App.get("/", (req, res) => {
    return res.json(dummyuser)
})

App.post("/createsection", dtoValidation(CreateSectionDto), async (req, res) => {
    try {
        const newSectionObj = req.body;;
        const newSectionObjFromDb: any = await Section.create({ user_id: dummyuser.user_id, ...newSectionObj });
        console.log(newSectionObjFromDb)
        const newSectionObjResponse: ResponseSectionDto = { id: newSectionObjFromDb?._id, section_title: newSectionObjFromDb?.section_title }
        console.log(newSectionObjResponse);
        return res.json(newSectionObjResponse);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "something went wrong while creating section", err: err });
    }

})
App.patch("/updatesection/:id", dtoValidation(CreateSectionDto), async (req, res) => {
    const sectionId = req.params.id;
    const newSectionObj = req.body;
    try {
        const updatedSectionObjfromDb: any = await Section.findByIdAndUpdate(sectionId, newSectionObj, { new: true });
        if (updatedSectionObjfromDb != null) {
            const updatedSectionObjResponse: ResponseSectionDto = { id: updatedSectionObjfromDb?._id, section_title: updatedSectionObjfromDb?.section_title }
            return res.json(updatedSectionObjResponse);
        }
    } catch (err) {
        return res.status(500).json({ msg: "something went wrong while updating section", err: err });
    }
})
App.delete("/deletesection/:id", async (req, res) => {
    const sectionId = req.params.id;
    try {
        const updatedSectionObjfromDb: any = await Section.findByIdAndDelete(sectionId, { new: true });
        if (updatedSectionObjfromDb != null) {
            const updatedSectionObjResponse: ResponseSectionDto = { id: updatedSectionObjfromDb?._id, section_title: updatedSectionObjfromDb?.section_title }
            return res.json(updatedSectionObjResponse);
        }
    } catch (err) {
        return res.status(500).json({ msg: "something went wrong while updating section", err: err });
    }

})
App.post("/createtodo", dtoValidation(CreateTodoDto), async (req, res) => {

    const newTodoObj: CreateTodoDto = req.body;
    try {
        const sectionExist: any = await Section.findById(newTodoObj.section_id);
        if (sectionExist !== null) {
            const newTodoObjFromDb: any = await Todo.create(newTodoObj);
            const { _id, __v, updatedAt, ...rest } = newTodoObjFromDb._doc;
            const newTodoObjResponse: ResponseTodoDto = { id: newTodoObjFromDb?._id, ...rest }
            return res.json(newTodoObjResponse);
        }
        else return res.status(400).json({ msg: "section doesn't exist, could not find the section associated with the given id" });


    } catch (err) {
        return res.status(500).json({ msg: "something went wrong while creating todo", err: err });
    }
})
App.patch("/updatetodo/:id", dtoValidation(CreateTodoDto), async (req, res) => {
    const todoId = req.params.id;
    const updateTodoObj: CreateTodoDto = req.body;
    try {
        const todoExist = Todo.where("_id").equals(todoId).where("section_id").equals(updateTodoObj.section_id);
        if (todoExist !== null) {
            const updatedTodoObjFromDb: any = await Todo.findByIdAndUpdate(todoId, updateTodoObj, { new: true });
            const { _id, __v, updatedAt, ...rest } = updatedTodoObjFromDb._doc;
            const newTodoObjResponse: ResponseTodoDto = { id: updatedTodoObjFromDb?._id, ...rest }
            return res.json(newTodoObjResponse);
        }
        else return res.status(400).json({ msg: "could not find the section associated with the given id/could not find the todo associated with the given id " });


    } catch (err) {
        return res.status(500).json({ msg: "something went wrong while updating todo", err: err });
    }
})
App.delete("/deletetodo/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo: any = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            const { _id, __v, updatedAt, ...rest } = deletedTodo._doc;
            const deletedTodoObjResponse: ResponseTodoDto = {
                id: deletedTodo._id,
                ...rest
            };
            return res.json(deletedTodoObjResponse);
        }

        return res.status(404).json({ msg: "Todo not found" });

    } catch (err) {
        return res.status(500).json({
            msg: "something went wrong while deleting the todo",
            err
        });
    }
});
