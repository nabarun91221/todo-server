
import { IsString, IsEnum, IsBoolean, IsDateString, IsArray, ArrayNotEmpty, IsOptional, IsMongoId } from "class-validator";

export enum TodoPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export class CreateTodoDto {

    @IsMongoId()
    section_id!: string;

    @IsString()
    todo_title!: string;

    @IsEnum(TodoPriority)
    todo_priority!: TodoPriority;

    // Accepts ISO date string → convert later to actual Date object
    @IsDateString()
    todo_deadline!: string;

    @IsArray()
    // @ArrayNotEmpty()
    @IsString({ each: true })
    todo_links!: string[];

    @IsBoolean()
    todo_status!: boolean;
}
