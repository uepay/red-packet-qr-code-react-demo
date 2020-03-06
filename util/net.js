/**
 * get请求，
 * @param url {String} 访问地址的url
 * @param params {Object} 访问参数对，会组织成url的query形式
 * @return {Promise<Response>}
 */
export const get = (url, params = false) => {
    const keys = Object.keys(params);
    if (params && keys && 0 < keys.length) {
        let query = /\?/.test(url) ? '' : '?';
        for (let key of keys) {
            query += `${key}=${params[key]}&`;
        }
        url += query;
        url = url.substring(0, url.length - 1);
    }
    return fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => onRes(res)).catch(function (error) {
        console.log('Fetch Error: ', error.message);
    })
};

/**
 * post请求，表示新增数据
 * @param url {String} 访问地址的url
 * @param params {Object} 访问参数对，会组织成url的query形式
 * @return {Promise<Response>}
 */
export const post = (url, params) => {
    if (params) {
        return fetch(url, {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(params),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => onRes(res)).catch(function (error) {
            console.log('Fetch Error: ', error.message);
        })
    } else {
        throw "必须设置Post传递参数的值";
    }
};

/**
 * put请求，表示修改数据
 * @param url {String} 访问地址的url
 * @param params {Object} 访问参数对，会组织成url的query形式
 * @return {Promise<Response>}
 */
export const put = (url, params) => {
    if (params) {
        return fetch(url, {
            method: 'PUT',
            mode: "cors",
            body: JSON.stringify(params),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => onRes(res)).catch(function (error) {
            console.log('Fetch Error: ', error.message);
        })
    } else {
        throw "必须设置Put传递参数的值";
    }
};

/**
 * delete请求，表示修改数据
 * @param url {String} 访问地址的url
 * @param params {Object} 访问参数对，会组织成url的query形式
 * @return {Promise<Response>}
 */
export const remove = (url, params = false) => {
    const keys = Object.keys(params);
    if (params && keys && 0 < keys.length) {
        let query = /\?/.test(url) ? '' : '?';
        for (let key of keys) {
            query += `${key}=${params[key]}&`;
        }
        url += query;
        url = url.substring(0, url.length - 1);
    }
    return fetch(url, {
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => onRes(res)).catch(function (error) {
        console.log('Fetch Error: ', error.message);
    })
};


const onRes = res => {
    if (res.ok) {
        return res.json();
    } else {
        return {
            code: -1,
            msg: "编码类型错误"
        }
    }
};