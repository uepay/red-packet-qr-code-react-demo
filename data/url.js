const ExistsHost = {
    Dev: 'http://192.168.0.22:8113',     // 开发环境服务器地址
    Fat: '',     // 开发环境服务器地址
    Uat: 'https://demo.uepay.mo',     // 准生产服务器地址
    Pro: ''     // 生产环境服务器地址
}

const Host = ExistsHost.Uat;

export { Host }