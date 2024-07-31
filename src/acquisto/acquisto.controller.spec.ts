import { Test, TestingModule } from "@nestjs/testing";
import { AcquistoController } from "./acquisto.controller";
import { AcquistoService } from "./acquisto.service";

describe("AcquistoController", () => {
  let controller: AcquistoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcquistoController],
      providers: [AcquistoService],
    }).compile();

    controller = module.get<AcquistoController>(AcquistoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
