import { Test, TestingModule } from "@nestjs/testing";
import { AcquistoService } from "./acquisto.service";

describe("AcquistoService", () => {
  let service: AcquistoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcquistoService],
    }).compile();

    service = module.get<AcquistoService>(AcquistoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
