
import { TodoPriority } from "./createTodo.dto";

export interface ResponseTodoDto {

    id: string;
    section_id: string;
    todo_title: string;
    todo_priority: TodoPriority;
    todo_deadline: Date;
    todo_links: string[];
    todo_status: boolean;
    createdAt: Date;
}
