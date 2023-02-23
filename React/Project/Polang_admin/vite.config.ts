import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "node-machine-id";
const { machineId, machineIdSync } = pkg;
let macId = machineIdSync();
// console.log(require, "id...");
// https://vitejs.dev/config/
// process.env._macId = macId;

export default defineConfig({
  server: {
    host: true,
    port: 6001,
  },
  plugins: [react()],
  define: {
    __KALO_MACID: JSON.stringify(macId),
  },
});
