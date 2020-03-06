/**
 * 系统级Url配置
 **/
import { Host } from './url';
import { get, post, put, remove } from '../util/net';

export const walletOnlinePay = (params) => {
    return new Promise((suc, err) => {
        let url = `${Host}/wallet/online/test/preorder.do`;
        post(url, params).then(data => {
            suc(data)
        }).catch(error => {
            err(error)
        })
    })
};
