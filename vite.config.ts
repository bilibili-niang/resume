import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            // 转换目标
            include: [
                /\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.jsx$/,
            ],
            // 全局导入注册
            imports: ['vue'],
            // 自动导入目录下的模块导出
            dirs: ['src/components/**/*'],
            // 生成模块声明文件目录
            dts: 'src/auto-imports.d.ts',
            // 是否在vue模板中自动导入
            vueTemplate: true,
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: 9091,
        // 是否开启 https
        // https: true,
    },
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@assets": path.resolve("src/assets"),
            "@components": path.resolve("src/components"),
        },
        dedupe: [
            "vue"
        ],
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    build: {
        outDir: './docs',
        emptyOutDir: true,
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    },
    base: '/resume/',
    css: {
        // 预处理器配置项
        preprocessorOptions: {
            less: {
                math: "always",
                // additionalData: "@import '@/assets/css/variables.less';"
                additionalData: "@import 'icepro/src/assets/variables.less';"
            },
        }
    },
})
