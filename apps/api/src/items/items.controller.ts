import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemsService } from "./items.service";

@ApiTags("items")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("items")
export class ItemsController {
  constructor(private service: ItemsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateItemDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request, @Query("categoryId") categoryId: string) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub, categoryId);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateItemDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }
}
