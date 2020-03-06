const express = require('express'),
    next = require('next'),
    //环境指示器
    env = process.env.NODE_ENV !== 'production',
    // 创建一个服务端运行的Next app
    app = next({ env }),
    // 请求处理器
    handle = app.getRequestHandler(),
    //端口
    port = parseInt(process.env.PORT, 10) || 13000;

app.prepare()
    .then(() => {
        const server = express();
        server.get('*', (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    }).catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });