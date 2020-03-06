module.exports = {
    apps: [
        {
            name: 'wallet-js-sdk',
            script: './server.js',
            env: {
                NODE_ENV: 'production'
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            out_file: './logs/out.log',
            error_file: './logs/err.log'
        },
    ],
};