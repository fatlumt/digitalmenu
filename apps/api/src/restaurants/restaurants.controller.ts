import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";

@ApiTags("restaurants")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("restaurants")
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateRestaurantDto) {
    const user = req.user as { sub: string };
    return this.service.create(user.sub, body);
  }

  @Get()
  list(@Req() req: Request) {
    const user = req.user as { sub: string };
    return this.service.list(user.sub);
  }

  @Get(":id")
  get(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.get(user.sub, id);
  }

  @Patch(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateRestaurantDto) {
    const user = req.user as { sub: string };
    return this.service.update(user.sub, id, body);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.remove(user.sub, id);
  }

  @Post(":id/publish")
  publish(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { sub: string };
    return this.service.publish(user.sub, id);
  }
}
