import axios, { AxiosProxyConfig } from "axios";

const proxies: AxiosProxyConfig[] = [
  {
    host: "proxy.scrapingbee.com",
    port: 8886,
    auth: {
      username: process.env.PROXY_API_KEY as string,
      password: "render_js=False&premium_proxy=True",
    },
  },
];

export const api = axios.create({});

export const apiWithUserAgent = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  },
});

export const apiWithProxy = axios.create({
  proxy: {
    ...proxies[0],
  },
});
