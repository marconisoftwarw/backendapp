import { Test, TestingModule } from "@nestjs/testing";
import { TotemhardwareController } from "./totemhardware.controller";
import { TotemhardwareService } from "./totemhardware.service";

describe("TotemhardwareController", () => {
  let controller: TotemhardwareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotemhardwareController],
      providers: [TotemhardwareService],
    }).compile();

    controller = module.get<TotemhardwareController>(TotemhardwareController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
