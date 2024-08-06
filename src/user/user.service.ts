import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, createQueryBuilder, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UtenteLogin } from "./entities/user.entity";
import { sendEmail,UserType } from "../support";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectConnection() private readonly connection: Connection
  ) {}
  /**
   * Create new user
   * @param dto
   * @returns
   */
  create(dto: CreateUserDto) {
    return this.repo.save(dto);
  }

  /**
   * Login function of user
   * @param dto
   * @returns
   */
  async Login(dto: UtenteLogin) {
    return this.repo.findOne({
      where: {
        username: dto.username,
        password: dto.password,
      },
    });
  }

  /**
   * Get list of all users
   * @returns
   */
  findAll() {
    return this.repo.find();
  }

  /**
   * Get user by id
   */
  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * Update single user
   * @param id
   * @param updateUtenteDto
   * @returns
   */
  update(id: number, updateUtenteDto: UpdateUserDto) {
    return this.repo.update(id, updateUtenteDto);
  }

  /**
   * Remove user
   * @param id
   * @returns
   */
  async remove(id: number) {
    var element = await this.findOne(id);
    return this.repo.remove(element);
  }

  /**
   * Update user password
   * @param id
   * @param password
   * @returns
   */
  async updapassword(id: string, password: string) {
    return await createQueryBuilder("user")
      .update<User>(User, { password: password })
      .where("user.id = :id", { id: id })
      .updateEntity(true)
      .execute();
  }

  /**
   * Update state of user
   * @param id
   * @param enable
   * @returns
   */
  async updatestate(id: string, enable: boolean) {
    return await this.connection
      .getRepository(User)
      .createQueryBuilder("user")
      .update<User>(User, { enable: enable })
      .where("user.id = :id", { id: Number(id) })
      .updateEntity(true)
      .execute();
  }

  /**
   * Update type of user
   * @param id
   * @param enable
   * @returns
   */
  async updatetypeofuser(id: string, type: UserType) {
    return await this.connection
      .getRepository(User)
      .createQueryBuilder("user")
      .update<User>(User, { type: type })
      .where("user.id = :id", { id: Number(id) })
      .updateEntity(true)
      .execute();
  }

  /**
   * Send email on user registration
   * @param email
   */
  async sendemailregister(email: String) {
    sendEmail(
      "Benvenuto all'interno del servizio Memoryp",
      email,
      "Registrazione Memoryp"
    );
  }
}
