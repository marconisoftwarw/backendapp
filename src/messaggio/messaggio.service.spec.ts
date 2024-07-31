import { Test, TestingModule } from "@nestjs/testing";
import { MessaggioService } from "./messaggio.service";

describe("MessaggioService", () => {
  let service: MessaggioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessaggioService],
    }).compile();

    service = module.get<MessaggioService>(MessaggioService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
