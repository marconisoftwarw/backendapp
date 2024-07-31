import { Test, TestingModule } from "@nestjs/testing";
import { TotemController } from "./totem.controller";
import { TotemService } from "./totem.service";

describe("TotemController", () => {
  let controller: TotemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotemController],
      providers: [TotemService],
    }).compile();

    controller = module.get<TotemController>(TotemController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
