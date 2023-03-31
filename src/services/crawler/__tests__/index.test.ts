import { expect, describe, it, vi } from "vitest";
import * as centauro from "../centauro";
import * as pontofrio from "../pontofrio";
import { getContent } from "../index";

vi.mock("../centauro", () => ({
  getContent: () => vi.fn(),
}));

vi.mock("../pontofrio", () => ({
  getContent: () => vi.fn(),
}));

describe("Crawler Service: Main File", () => {
  it("Should call centauro crawler when domain is centauro", async () => {
    const url = "https://www.centauro.com.br";
    const spy = vi.spyOn(centauro, "getContent");
    await getContent(url);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Should call pontofrio crawler when domain is pontofrio", async () => {
    const url = "https://www.pontofrio.com.br";
    const spy = vi.spyOn(pontofrio, "getContent");
    await getContent(url);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
