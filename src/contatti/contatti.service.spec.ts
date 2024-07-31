import { Test, TestingModule } from "@nestjs/testing";
import { ContattiService } from "./contatti.service";

describe("ContattiService", () => {
  let service: ContattiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContattiService],
    }).compile();

    service = module.get<ContattiService>(ContattiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
