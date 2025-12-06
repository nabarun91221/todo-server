import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {

    @IsNotEmpty()
    @IsString()
    user_Id!: string;

    @IsNotEmpty()
    @IsString()
    section_title!: string;


}