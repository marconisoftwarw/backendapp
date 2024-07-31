import { Test, TestingModule } from "@nestjs/testing";
import { TotemhardwareService } from "./totemhardware.service";

describe("TotemhardwareService", () => {
  let service: TotemhardwareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotemhardwareService],
    }).compile();

    service = module.get<TotemhardwareService>(TotemhardwareService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
