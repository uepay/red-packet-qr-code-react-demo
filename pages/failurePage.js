import { Icon, Result, WhiteSpace } from 'antd-mobile';

import css from "./layout.scss";

class FailurePage extends React.Component {

    state = {

    }

    componentDidMount() {

    }


    render() {

        return (
            <div className={css.result_page}>
                <Result
                    img={<Icon type="cross-circle-o" className={css.result_spe} style={{ fill: '#F13642' }} />}
                    title="支付失敗"
                    message="請聯繫極易付"
                />
            </div>
        )
    }
}

export default FailurePage