import { Icon, Result, WhiteSpace } from 'antd-mobile';

import css from "./layout.scss";

class ResultPage extends React.Component {

    state = {
        data: {},
        tradeState: '',
    }

    componentDidMount() {
        const query = this.getQuery();
        const orderNum = query.orderNum;
        this.getData(orderNum);
    }

    getData = (orderNum) => {
        var _this = this;
        // payInfo(orderNum).then(data => {
        //     var tradeState = data.tradeState;
        //     if (tradeState && tradeState !== '') {
        //         _this.setState({ data: data, tradeState });
        //     }
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    getQuery = (sHref = window.location.href) => {
        var obj = {};
        var args = sHref.split('?');
        if (args[0] == sHref) return obj;
        var arr = args[1].split('&');
        for (var i = 0; i < arr.length; i++) {
            var arg = arr[i].split('=');
            obj[arg[0]] = arg[1];
        }
        return obj;
    }

    render() {

        const { tradeState, data } = this.state;
        const myImg = src => <img src={src} className={css.result_spe} alt="" />;

        return (
            <div className={css.result_page}>
                {tradeState === 'SUCCESS' ?
                    <div>
                        <Result
                            img={<Icon type="check-circle" className={css.result_spe} style={{ fill: '#1F90E6' }} />}
                            title="支付成功"
                            message={<div>{data.amount}元</div>}
                        />
                        <WhiteSpace style={{ backgroundColor: '#fff' }} />
                        <div className={css.order_info}>
                            <div className={css.item}>
                                <spn className={css.item_title}>交易時間</spn>
                                <spn className={css.item_conten}>{data.tradeTime}</spn>
                            </div>
                            <div className={css.item}>
                                <spn className={css.item_title}>訂單號</spn>
                                <spn className={css.item_conten}>{data.orderNo}</spn>
                            </div>
                        </div>
                    </div>
                    :
                    // (flag === '3' ?
                    //     <Result
                    //         img={<Icon type="cross-circle-o" className={css.result_spe} style={{ fill: '#F13642' }} />}
                    //         title="支付失敗"
                    //         message="請聯繫極易付"
                    //     />
                    //     :
                    //     <Result
                    //         img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                    //         title="等待處理"
                    //         message="已提交支付，等待後台处理"
                    //     />)
                    <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                        title="等待處理"
                        message="已提交支付，等待後台处理"
                    />
                }
            </div>
        )
    }
}

export default ResultPage