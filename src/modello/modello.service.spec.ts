import { Test, TestingModule } from "@nestjs/testing";
import { ModelloService } from "./modello.service";

describe("ModelloService", () => {
  let service: ModelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelloService],
    }).compile();

    service = module.get<ModelloService>(ModelloService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
