
import { Request, Response } from 'express';
import { Autowired, Controller, Get } from 'node-boot-core';
import { Logger } from 'node-boot-logger';
import { sendMail } from 'node-boot-mail';
import { MailService } from '../service/MailService';
import { UserService } from "../service/UserService";
import { HomeController } from './HomeController';

@Controller("user")
export class UserController {
  
  @Autowired("UserService")
  private userService: UserService;

  @Autowired("HomeController")
  private homeController: HomeController;

  @Autowired("MailService")
  private mailService: MailService;

  constructor() {}

  @Get()
  private async get(req: Request, res: Response) {
    Logger.Info("Hello world log");
    Logger.Error("Hello world log");
    Logger.Warning("Hello world log");
    Logger.Important("Hello world log");
    const mail = await this.mailService.sendMail({ body: "<h1>hello</h1>", subject: "hello", to: "info.kaushikparmar@gmail.com" });
    const mail2 = await sendMail({ body: "<h1>hello two</h1>", subject: "hello", to: "info.kaushikparmar@gmail.com" });
    return res.status(200).json({
      message: "user_called",
      data: this.userService.name("20"),
      home: this.homeController.getData("40")
    });
  }
}