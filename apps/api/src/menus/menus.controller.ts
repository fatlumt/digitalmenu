import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { MenusService } from "./menus.service";

@ApiTags("menus")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("menus")
export class MenusController {
  constructor(private service: MenusService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateMenuDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request, @Query("restaurantId") restaurantId?: string) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub, restaurantId);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateMenuDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }
}
