import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { AxiosInstance } from "axios";
import { api } from "../axios";

beforeEach(() => {
  mockReset(axiosMock);
});

const axiosMock = mockDeep<AxiosInstance>(api);

export default axiosMock;
