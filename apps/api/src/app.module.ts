import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ItemsModule } from "./items/items.module";
import { MenusModule } from "./menus/menus.module";
import { OptionsModule } from "./options/options.module";
import { OptionGroupsModule } from "./option-groups/option-groups.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PublicModule } from "./public/public.module";
import { QrModule } from "./qr/qr.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    PrismaModule,
    AuthModule,
    RestaurantsModule,
    MenusModule,
    CategoriesModule,
    ItemsModule,
    OptionGroupsModule,
    OptionsModule,
    PublicModule,
    QrModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
