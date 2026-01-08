import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateOptionGroupDto } from "./dto/create-option-group.dto";
import { UpdateOptionGroupDto } from "./dto/update-option-group.dto";
import { OptionGroupsService } from "./option-groups.service";

@ApiTags("option-groups")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("option-groups")
export class OptionGroupsController {
  constructor(private service: OptionGroupsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateOptionGroupDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request, @Query("itemId") itemId: string) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub, itemId);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateOptionGroupDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }
}
