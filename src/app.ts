import express from "express";
import { connectMongoDb } from "./db/mogoClient.ts";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/aut.middleware";
import { dtoValidation } from "./middleware/dto.validation.middleware.ts";
import { CreateTodoDto } from "./dto/createTodo.dto.ts";
import { CreateSectionDto } from "./dto/createSection.dto.ts";
import { Db } from "mongodb";
import { plainToInstance } from "class-transformer";
import { ResponseSectionDto } from "./dto/responseSection.dto.ts";

const PORT = process.env.PORT || 8080;

const App = express();
App.use(express.json());
App.use(cookieParser());

let mongoDbClient: Db;

const initiateMongoDb = async () => {
    try {
        mongoDbClient = await connectMongoDb();
        console.log("mongoDB connection successful");
    } catch (err) {
        console.error({
            msg: "some problem occurred while connecting to mongoDB",
            err: err
        });
    }
}
initiateMongoDb();

App.listen(PORT, () => {
    console.log("The todo-server has started");
})


App.post("/createsection", dtoValidation(CreateSectionDto), async (req, res) => {
    const newSectionObj = req.body;
    const newSectionObjFromDb = await mongoDbClient.collection("section").insertOne(newSectionObj);
    const newSectionResponse = plainToInstance(ResponseSectionDto, newSectionObjFromDb);
    res.json(newSectionResponse)
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