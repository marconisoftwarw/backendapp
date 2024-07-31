import { Test, TestingModule } from "@nestjs/testing";
import { ModelloController } from "./modello.controller";
import { ModelloService } from "./modello.service";

describe("ModelloController", () => {
  let controller: ModelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelloController],
      providers: [ModelloService],
    }).compile();

    controller = module.get<ModelloController>(ModelloController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
