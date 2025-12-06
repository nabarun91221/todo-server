import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {

    @IsNotEmpty()
    @IsString()
    section_title!: string;


}