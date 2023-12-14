import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [vue(),
        AutoImport({
            // 转换目标
            include: [
                /\.vue$/, /\.vue\?vue/,
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
    resolve: {
        alias: {
            "@": path.resolve("src"),
        },
        dedupe: [
            "vue"
        ],
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
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
