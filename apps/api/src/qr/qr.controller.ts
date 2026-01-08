import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import QRCode from "qrcode";

@ApiTags("qr")
@Controller("qr")
export class QrController {
  @Get()
  async generate(@Query("url") url: string, @Query("format") format: "svg" | "png" = "svg", @Res() res: Response) {
    if (!url) {
      res.status(400).send({ error: "url is required" });
      return;
    }

    if (format === "png") {
      const buffer = await QRCode.toBuffer(url, { width: 512 });
      res.setHeader("Content-Type", "image/png");
      res.send(buffer);
      return;
    }

    const svg = await QRCode.toString(url, { type: "svg", margin: 1 });
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  }
}
