import { Test, TestingModule } from "@nestjs/testing";
import { TotemService } from "./totem.service";

describe("TotemService", () => {
  let service: TotemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotemService],
    }).compile();

    service = module.get<TotemService>(TotemService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
