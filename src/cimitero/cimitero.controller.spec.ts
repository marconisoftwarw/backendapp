import { Test, TestingModule } from "@nestjs/testing";
import { CimiteroController } from "./cimitero.controller";
import { CimiteroService } from "./cimitero.service";

describe("CimiteroController", () => {
  let controller: CimiteroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CimiteroController],
      providers: [CimiteroService],
    }).compile();

    controller = module.get<CimiteroController>(CimiteroController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
