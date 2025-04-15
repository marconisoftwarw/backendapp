import { Controller, Get, Post, Body, Param, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UtenteLogin } from "./entities/user.entity";
import { Response, Request } from "express";
import { ApiTags } from "@nestjs/swagger";

import { sendEmail, UserType } from "../support";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(
    private readonly utenteService: UserService,
    private jwtservice: JwtService
  ) {}

  /**
   * Create new user
   * @param dto
   * @param request
   * @returns
   */
  @Post()
  async create(@Body() dto: CreateUserDto) {
    var newuser = await this.utenteService.create(dto);
    if (newuser.email.length > 0) {
      this.utenteService.sendemailregister(newuser.email);
    }
    return newuser;
  }

  /**
   * Get all user list
   * @param request
   * @returns
   */
  @Get()
  async findAll(@Req() request: Request) {
    return await this.utenteService.findAll();
  }

  /**
   * Login endpoint generate token
   * @param dto
   * @param response
   */
  @Post("/login")
  async login(
    @Body() dto: UtenteLogin,
    @Res({ passthrough: true }) response: Response
  ) {
    var message = "success";

    const user = await this.utenteService.Login(dto);
    if (!user) {
      message = "denied";
    }

    const jwt = await this.jwtservice.signAsync({ id: user.id ? user.id : 0 });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send({
      message: message,
      token: jwt,
      idUser: user.id ? user.id : 0,
      type: user.type,
      email: user.email,
    });
  }

  /**
   * Get single user by id
   * @param id
   * @param response
   * @param request
   * @returns
   */
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.utenteService.findOne(+id);
  }

  /**
   * Chnage user password
   * @param id
   * @param password
   * @param request
   * @returns
   */
  @Post("/changepassword")
  async updatepassword(
    @Body("id") id: string,
    @Body("password") password: string,
    @Req() request: Request
  ) {
    return await this.utenteService.updapassword(id, password);
  }

  @Post("/sendmail")
  async sendmailtouser(
    @Body("email") email: string,
    @Body("message") message: string
  ) {
    try {
      console.log("messaggio");
      sendEmail(message, email, "Creazione utente", true);
    } catch (err) {
      console.error("prova");
    }
  }
  /**
   * Delete user
   * @param id
   * @param request
   * @returns
   */
  @Post("/delete:id")
  async remove(@Body("id") id: string, @Req() request: Request) {
    return await this.utenteService.remove(+id);
  }

  /**
   * Enable/Disable User
   * @param id
   * @param enable
   * @param request
   * @returns
   */
  @Post("/updatestate")
  async updatestate(@Body("id") id: string, @Body("enable") enable: boolean) {
    return await this.utenteService.updatestate(id, enable);
  }

  @Post("/updateusertype")
  async updateusertype(@Body("id") id: string, @Body("type") type: UserType) {
    return await this.utenteService.updatetypeofuser(id, type);
  }
}
