/**
 *  調用 uepay wallet sdk 支付案例，環境：react，UI：antd-mobile。
 *  更多函數使用方法請參考 README.md 文獻說明。
 */
import { InputItem, WingBlank, Button, WhiteSpace, Toast } from 'antd-mobile';

import Avatar from '../components/avatar';
import UePay from 'uepay-wallet-js-sdk/index';      // 引入uepay wallet sdk
import Router from 'next/router';
import css from "./layout.scss";

import { walletOnlinePay } from '../data/appUrl';

class Index extends React.Component {

    constructor(...props) {
        super(...props);
        this.paySdk = UePay.build(this.paymentCallback);      // 支付初始化

        this.state = {
            amt: '',
            loading: false,
            isIPhone: false,
            isPay: true
        }
    }

    componentDidMount() {
        this.inputRef.focus();
        // 判斷是否為手機內核
        const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
        this.setState({ isIPhone });
        if (UePay.isUePayApp()) {      // 判斷是否為uepay內核，true：表示是；false：表示否
            this.setState({ isPay: false });
        }
    }

    paymentCallback = res => {      // 支付成功回調函數      
        var obj = JSON.parse(res);
        if (obj.ret_code === '00') {      // '00' 表示成功
            Router.push(`/succeedPage`);
            return;
        }
        if (obj.ret_code === '01') {       // '01' 表示失敗
            Router.push(`/failurePage`);
            return;
        }
        if (obj.ret_code === '02') {      // '02' 表示放棄支付
            // alert('用戶取消支付')
            Router.push(`/failurePage`);
            return;
        }
    };

    getData = (amt) => {
        var _this = this;
        let params = {
            "type": "JSAPI",
            "amt": amt.toString(),
            "body": "UePay錢包APP支付测试",
            "orderNo": new Date().getTime().toString()
        }
        _this.setState({ loading: true });
        walletOnlinePay(params).then(data => {
            var req = {
                appId: data['appId'],
                timeStamp: data['timeStamp'],
                nonceStr: data['nonceStr'],
                prepayid: data['prepayid'],
                signType: data['signType'],
                paySign: data['paySign']
            }
            this.paySdk.payment(req);      // 支付
            _this.setState({ loading: false });
        }).catch(err => {
            _this.setState({ loading: false });
            console.log(err);
        })
    }

    handleAmt = (val) => {
        var num = val * 100;
        this.setState({ amt: num });
    }

    handlePay = () => {
        const { amt } = this.state;
        if (amt && amt !== '') {
            this.getData(amt);
        } else {
            Toast.info('請輸入金額', 1);
        }
    }

    render() {
        const { loading, isIPhone, isPay } = this.state;

        // 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
        let moneyKeyboardWrapProps;
        if (isIPhone) {
            moneyKeyboardWrapProps = {
                onTouchStart: e => e.preventDefault(),
            };
        }

        return (
            <div>
                <div className={css.merchant_logo}>
                    <Avatar shape="circle" size={60} alt="商户" src="../static/shop_logo.png" />
                    <span className={css.merchant_name}>测试商户</span>
                </div>
                <WingBlank className={css.money} size="md">
                    <span className={css.money_title}>金額</span>
                    <InputItem
                        type='money'
                        placeholder="0.00"
                        clear
                        ref={el => this.inputRef = el}
                        moneyKeyboardAlign="left"
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        onChange={this.handleAmt}
                        extra={<span style={{ color: '#000' }}>MOP</span>} >
                        <span style={{ fontSize: '24px' }}>¥</span>
                    </InputItem>
                </WingBlank>

                <WhiteSpace />
                <WhiteSpace />

                <WingBlank>
                    <Button disabled={isPay} loading={loading} type="primary" onClick={this.handlePay}>
                        {loading ? '支付中' : '立即支付'}
                    </Button>
                </WingBlank>
            </div>
        )
    }
}

export default Index