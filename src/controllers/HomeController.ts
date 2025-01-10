import { Controller, Get, Post } from "node-boot-core";
import { Request, Response } from 'express';

@Controller("home")
export class HomeController {
  @Get("world")
  private get(req: Request, res: Response): any {
    return res.status(200).json({
      message: "home_called",
    });
  }

  @Post("world")
  private create(req: Request, res: Response): any {
    return res.status(200).json({
      message: "home_called",
    });
  }

  public getData(item:any) {
    return item;
  }
}