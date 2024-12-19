import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

export default defineConfig(() => {
  return {
    server: {
      port: 5277,
      proxy: {
        '/api': {
          // target: 'https://backendAddress:port',
          target: 'https://wacb.pw:9988',
          changeOrigin: true,
          // rewrite: (p: string) => p.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    build: {
      minify: 'esbuild' as any
    },
    esbuild: {
      drop: ['console', 'debugger'] as any
    },
    plugins: [
      react(),
      obfuscatorPlugin({
        include: [
          "src/*.jsx",
          "src/**/*.jsx",
          "src/**/**/*.jsx",
          "src/*.js",
          "src/**/*.js",
          "src/**/**/*.js",
        ],
        exclude: [/node_modules/, /dist/],
        apply: 'build',
        debugger: true,
        options: {
          // 压缩代码
          compact: true,
          // 启用控制流混淆，使代码的控制流程变得更加复杂，从而增加代码的难以理解性。
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          // 如果设置为 true，将数字转换为表达式，增加代码的复杂性。
          numbersToExpressions: true,
          // 	启用简化，用于删除不必要的代码。
          simplify: true,
          // 打乱字符串数组，使字符串更难以理解。
          stringArrayShuffle: false,
          // 将字符串拆分成小块，增加代码的复杂性。
          splitStrings: false,
          // 控制字符串拆分的块大小。
          splitStringsChunkLength: 10,
          // 	旋转 Unicode 字符数组，增加代码的混淆度。
          rotateUnicodeArray: false,
          // 无用代码注入，开启膨胀，插入死代码，使代码更复杂，阻碍逆向工程。
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          // 如果设置为 true，将启用调试保护。
          debugProtection: true,
          debugProtectionInterval: 2000,
          // 	禁用控制台输出。
          disableConsoleOutput: false,
          // 	限制脚本运行的域名列表。
          domainLock: [],
          // 控制混淆后的标识符名称生成方式，如 "hexadecimal"。
          identifierNamesGenerator: 'hexadecimal',
          // 标识符前缀，可增加混淆度。
          identifiersPrefix: '',
          // 	输入文件名。
          inputFileName: '',
          // 是否启用日志记录。
          log: true,
          // 	是否重命名全局变量。
          renameGlobals: true,
          // 	保留的标识符名字列表。
          reservedNames: [],
          // 	保留的字符串列表。
          reservedStrings: [],
          // 	用于生成随机数的种子。
          seed: 0,
          // 代码自我保护，强制一行显示，格式化后不能执行,如果设置为 true，将启用自我保护模式。
          selfDefending: true,
          // 	是否生成源映射文件。
          sourceMap: false,
          sourceMapBaseUrl: '',
          sourceMapFileName: '',
          sourceMapMode: 'separate',
          // 	是否启用字符串数组混淆。
          stringArray: false,
          // 字符串数组的编码方式，如 "base64"
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 0.75,
          // 	目标环境，如 "browser".
          target: 'node',
          // 	是否转换对象键名。
          transformObjectKeys: false,
          // 启用 Unicode 转义序列。
          unicodeEscapeSequence: true,

          // 	域名锁定重定向的URL。
          // domainLockRedirectUrl: "about:blank",
          // 	强制转换字符串的列表。
          // forceTransformStrings: [],
          // 	标识符名称的缓存。
          identifierNamesCache: null,
          // 	标识符字典，用于自定义标识符名称。
          // identifiersDictionary: [],
          // 	是否忽略导入的模块。
          ignoreImports: true,
          // 	预定义的配置选项集，如 "default".
          optionsPreset: 'default',
          // 	是否重命名对象属性。
          renameProperties: false,
          // 	对象属性重命名模式，如 "safe".
          renamePropertiesMode: 'safe',
          // 源映射的模式。
          sourceMapSourcesMode: 'sources-content',

          // 	是否转换字符串数组调用。
          stringArrayCallsTransform: true,
          stringArrayCallsTransformThreshold: 0.5,

          // 	字符串数组索引的类型，如 "hexadecimal-number".
          stringArrayIndexesType: ['hexadecimal-number'],
          // 是否进行字符串数组索引的位移。
          stringArrayIndexShift: true,
          // 	是否旋转字符串数组。
          stringArrayRotate: true,
          // 	字符串数组包装器的数量。
          stringArrayWrappersCount: 1,
          // 	是否启用字符串数组包装器的链接调用。
          stringArrayWrappersChainedCalls: true,
          // 字符串数组包装器的参数最大数量。
          stringArrayWrappersParametersMaxCount: 2,
          // 	字符串数组包装器的类型。
          stringArrayWrappersType: 'variable'
        },
      }),
    ],
  }
})
