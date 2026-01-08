import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateCategoryDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request, @Query("menuId") menuId: string) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub, menuId);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateCategoryDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }
}
