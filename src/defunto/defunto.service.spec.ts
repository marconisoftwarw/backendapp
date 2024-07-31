import { Test, TestingModule } from "@nestjs/testing";
import { DefuntoService } from "./defunto.service";

describe("DefuntoService", () => {
  let service: DefuntoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefuntoService],
    }).compile();

    service = module.get<DefuntoService>(DefuntoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
