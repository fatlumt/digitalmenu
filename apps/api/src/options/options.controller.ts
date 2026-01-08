import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateOptionDto } from "./dto/create-option.dto";
import { UpdateOptionDto } from "./dto/update-option.dto";
import { OptionsService } from "./options.service";

@ApiTags("options")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("options")
export class OptionsController {
  constructor(private service: OptionsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateOptionDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request, @Query("optionGroupId") optionGroupId: string) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub, optionGroupId);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateOptionDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }
}
