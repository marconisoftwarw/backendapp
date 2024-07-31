import { Test, TestingModule } from "@nestjs/testing";
import { ContattiController } from "./contatti.controller";
import { ContattiService } from "./contatti.service";

describe("ContattiController", () => {
  let controller: ContattiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContattiController],
      providers: [ContattiService],
    }).compile();

    controller = module.get<ContattiController>(ContattiController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
