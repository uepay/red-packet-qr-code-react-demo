// 问题处理参考地址（nextjs 和 antd 完美融合）：https://www.cnblogs.com/1wen/p/10793868.html

const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const withSass = require('@zeit/next-sass');
const withPlugins = require("next-compose-plugins");
const { getLocalIdent } = require("css-loader/dist/utils");
const path = require('path');

module.exports = withPlugins([withLess, withCss, withSass], {
    distDir: 'dist', //工作&打包文件生成路径
    cssModules: true,
    cssLoaderOptions: {
        camelCase: true,
        localIdentName: "[local]___[hash:base64:5]",
        getLocalIdent: (context, localIdentName, localName, options) => {
            let hz = context.resourcePath.replace(context.rootContext, "");
            if (/node_modules/.test(hz)) {
                return localName;
            } else {
                return getLocalIdent(
                    context,
                    localIdentName,
                    localName,
                    options
                );
            }
        }
    },
    webpack(config) {
        if (config.externals) {
            const includes = [/antd-mobile/];
            config.externals = config.externals.map(external => {
                if (typeof external !== 'function') return external;
                return (ctx, req, cb) => {
                    return includes.find(include =>
                        req.startsWith('.')
                            ? include.test(path.resolve(ctx, req))
                            : include.test(req)
                    )
                        ? cb()
                        : external(ctx, req, cb);
                };
            });
        }
        return config;
    }
});