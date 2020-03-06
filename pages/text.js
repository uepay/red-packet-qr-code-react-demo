import React from 'react';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import Router from 'next/router';
import UePay from 'uepay-wallet-js-sdk/index';

import { walletOnlinePay } from '../data/appUrl';

class Text extends React.Component {

    constructor(...props) {
        super(...props);
        this.paySdk = UePay.build(this.paymentCallback)
    }

    componentDidMount() {
        // if (UePay.isUePayApp()) {
        //     Router.push(`/payPage`);
        //     return;
        // }
    }

    paymentCallback = res => {
        var obj = JSON.parse(res);
        if (obj.ret_code === '00') {
            alert('支付成功');
        }
        if (obj.ret_code === '01') {
            alert('支付失敗')
        }
        if (obj.ret_code === '02') {
            alert('用戶取消支付')
        }
    };

    handlePay = () => {
        let params = {
            "type": "JSAPI",
            "amt": "10",
            "body": "UePay錢包APP支付测试",
            "orderNo": new Date().getTime().toString()
        }
        this.getWalletOnlinePayService(params);
    }

    getWalletOnlinePayService = (params) => {
        walletOnlinePay(params).then(data => {
            var req = {
                appId: data['appId'],
                timeStamp: data['timeStamp'],
                nonceStr: data['nonceStr'],
                prepayid: data['prepayid'],
                signType: data['signType'],
                paySign: data['paySign']
            }
            this.paySdk.payment(req);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {

        const agent = UePay.getUserAgent();

        return (<React.Fragment>
            <WingBlank size="lg">
                <h2>UePay电子钱包App 线上支付jsSDK</h2>
                <WhiteSpace size="lg" />
                <h3>判断当前是否为钱包内核打开</h3>
                <p>{UePay.isUePayApp() ? 'UePay钱包内核' : '非UePay钱包内核'}</p>
                <WhiteSpace size="lg" />
                <h3>浏览器代理环境信息</h3>
                <p>
                    服務端版本：{agent.UePay}
                    <br />
                    客戶端版本：{agent.UePayClient}
                </p>
                <WhiteSpace size="lg" />
                <Button type="primary" inline size="small" onClick={this.handlePay}>在线支付</Button>
            </WingBlank>
        </React.Fragment>);
    }
}

export default Text;