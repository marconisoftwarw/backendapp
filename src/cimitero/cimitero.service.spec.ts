import { Test, TestingModule } from "@nestjs/testing";
import { CimiteroService } from "./cimitero.service";

describe("CimiteroService", () => {
  let service: CimiteroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CimiteroService],
    }).compile();

    service = module.get<CimiteroService>(CimiteroService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
