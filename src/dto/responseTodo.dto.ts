import { Expose, Transform } from "class-transformer";
import { TodoPriority } from "./createTodo.dto";

export class ResponseTodoDto {

    @Expose()
    @Transform(({ value }) => value?.toString()) // convert ObjectId → string
    _id!: string;

    @Expose()
    section_id!: string;

    @Expose()
    todo_title!: string;

    @Expose()
    todo_priority!: TodoPriority;

    @Expose()
    todo_deadline!: Date;

    @Expose()
    todo_links!: string[];

    @Expose()
    todo_status!: boolean;

    @Expose()
    createdAt!: Date;
}
