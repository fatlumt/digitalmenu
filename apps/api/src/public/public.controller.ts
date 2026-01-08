import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PublicService } from "./public.service";

@ApiTags("public")
@Controller("restaurants")
export class PublicController {
  constructor(private service: PublicService) {}

  @Get(":slug/public")
  getPublic(@Param("slug") slug: string) {
    return this.service.getPublicMenu(slug);
  }
}
