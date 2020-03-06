import { Icon, Result, WhiteSpace } from 'antd-mobile';

import css from "./layout.scss";

class SucceedPage extends React.Component {

    state = {

    }

    componentDidMount() {

    }


    render() {

        return (
            <div className={css.result_page}>
                <Result
                    img={<Icon type="check-circle" className={css.result_spe} style={{ fill: '#1F90E6' }} />}
                    title="支付成功"
                    message={<div>{10}元</div>}
                />
                <WhiteSpace style={{ backgroundColor: '#fff' }} />
                <div className={css.order_info}>
                    <div className={css.item}>
                        <spn className={css.item_title}>交易時間</spn>
                        <spn className={css.item_conten}>{'2088-08-08 18:88:88'}</spn>
                    </div>
                    <div className={css.item}>
                        <spn className={css.item_title}>訂單號</spn>
                        <spn className={css.item_conten}>{'88888888888888888'}</spn>
                    </div>
                </div>
            </div>
        )
    }
}

export default SucceedPage