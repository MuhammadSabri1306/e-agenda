import { fileURLToPath, URL } from "url";
import dns from "dns";
import copyUrl from "./copy-url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    const plugins = [vue()],
        base = (command == "serve") ? "/" : "/",
        resolve = {
            alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
        },
        server = {};

    if(command !== "serve")
        return { plugins, base, resolve };

    const host = server.host || "localhost",
        port = server.port || 5173;
    copyUrl({ host, port });
    
    return { plugins, base, resolve, server };
});