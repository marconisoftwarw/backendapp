import { Test, TestingModule } from "@nestjs/testing";
import { MessaggioController } from "./messaggio.controller";
import { MessaggioService } from "./messaggio.service";

describe("MessaggioController", () => {
  let controller: MessaggioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessaggioController],
      providers: [MessaggioService],
    }).compile();

    controller = module.get<MessaggioController>(MessaggioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
