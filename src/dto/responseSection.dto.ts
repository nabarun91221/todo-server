import { Expose } from "class-transformer";

export class ResponseSectionDto {

    @Expose()
    user_Id!: string;
    @Expose()
    section_title!: string;

}