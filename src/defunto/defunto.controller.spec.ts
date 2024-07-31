import { Test, TestingModule } from "@nestjs/testing";
import { DefuntoController } from "./defunto.controller";
import { DefuntoService } from "./defunto.service";

describe("DefuntoController", () => {
  let controller: DefuntoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefuntoController],
      providers: [DefuntoService],
    }).compile();

    controller = module.get<DefuntoController>(DefuntoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
