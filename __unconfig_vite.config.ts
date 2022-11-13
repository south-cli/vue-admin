
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig, loadEnv } from 'vite'
import { handleEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
const __unconfig_default =  defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = handleEnv(env)
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv

  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    },
    define: {
      'process.env': {}
    },
    server: {
      port: VITE_SERVER_PORT,
      open: true,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
    },
    test: {
      environment: 'jsdom',
      setupFiles: './tests/index.ts'
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
      },
    },
    build: {
      sourcemap: false,
      minify: false,
      brotliSize: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        },
      }
    }
  }
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;