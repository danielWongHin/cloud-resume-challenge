export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Your Azure static website endpoint (NO trailing slash)
    const endpoint = "https://danielwongcrc2025.z13.web.core.windows.net";

    const path = url.pathname;

    const fileExtensions = [
      "/assets/",
      "/script/",
      "/css/",
      "/js/",
      "/data/", // <-- JSON folder
    ];

    // Serve assets directly (css, js, images, json, etc.)
    if (fileExtensions.some((p) => path.startsWith(p))) {
      const azureUrl = `${endpoint}${path}`;
      return fetch(azureUrl);
    }

    // Serve specific HTML pages directly
    if (path.endsWith(".html")) {
      const azureUrl = `${endpoint}${path}`;
      return fetch(azureUrl);
    }

    // SPA fallback for anything else
    const indexUrl = `${endpoint}/index.html`;
    const indexResp = await fetch(indexUrl);

    const headers = new Headers(indexResp.headers);
    headers.set("Cache-Control", "public, max-age=300");
    headers.set("Content-Type", "text/html; charset=utf-8");

    return new Response(indexResp.body, {
      status: 200,
      headers,
    });
  },
};
