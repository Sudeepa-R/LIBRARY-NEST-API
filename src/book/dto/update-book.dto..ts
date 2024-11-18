import { PartialType } from "@nestjs/mapped-types";
import { createBookDto } from "./create-book.dto";

export class UpdateDto extends PartialType(createBookDto){}