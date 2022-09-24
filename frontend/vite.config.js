import { fileURLToPath, URL } from "url";
import dns from "dns";
import copyUrl from "./copy-url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    const config = {
        plugins: [vue()],
        base: (command == "serve") ? "/" : "/",
        resolve: {
            alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
        },
        server: { host: null, port: null }
    };

    if(command === "serve")
        copyUrl(config.server);
    else
        delete config.server;

    return config;
});