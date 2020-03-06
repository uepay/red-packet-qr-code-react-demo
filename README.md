# red-packet-qr-code-react-demo
##### Uepay钱支付案例
##### 开发环境：Reat
##### UI: antd-moblie
##### uepa钱包SDK：https://www.npmjs.com/package/uepay-wallet-js-sdk （SDK安装说明，接口使用请参考该网站）

## 安装
1. git clone 代码到本地
2. npm i 安装
3. npm run dev 运行

分别执行以下命令
1. `git clone https://github.com/uepay/red-packet-qr-code-react-demo.git`
1. `$ cd  red-packet-qr-code-react-demo`
1. `$ npm i 安装必须有的nodejs环境`
1. `$ npm run dev`

## 实例使用方法
步骤：1、app扫描H5 URL 生产的二维码。
2、进入H5页面，点击“在线支付”按钮。

## uepay钱包接口
1、获取版本号
```
import UePay from 'uepay-wallet-js-sdk/index';
 
const agent = UePay.getUserAgent();    // 获取当前浏览代理头
var serverSide = agent.UePay;      // 服務端版本
var clientSide = agent.UePayClient;    // 客戶端版本
```

2、判断当前是否为钱包内核
```
import UePay from 'uepay-wallet-js-sdk/index';
 
const isUePay = UePay.isUePayApp();    // true为UePay钱包内核，false为非UePay钱包内核
```

3、异步方法用于注册被监听的全局文件准备就绪事件
```
import UePay from 'uepay-wallet-js-sdk/index';
 
const isUePay = UePay.onReady();
/**
 * (uePay) => {
 *     uePay && uePay.payment();
 * }
 */
 ```
 
 4、实例化UePayJsApi并发起支付
 ```
 import UePay from 'uepay-wallet-js-sdk/index';
 
var paySdk = UePay.build(function(res) {});
paySdk.payment(req);
```
build里面参数为支付结果回调函数，支付成功res返回{'ret_code':'complete','ret_msg':'successful'}JOSN字符串，支付失败res返回{'ret_code':'fail','ret_msg':'cancel'}JOSN字符串。

req为支付信息参数对象，结果为appId（分配给商户的）、timeStamp（时间戳）、nonceStr（由服务器生产的随机串，用于验证前后端交互的一致性）、prepayid（预支付订单的传递订单号）、signType（签名散列算法，现在固定为'MD5'）、paySign（验签参数）

 
