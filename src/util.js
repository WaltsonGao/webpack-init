export const baiduTongji = () => {
    window._hmt = window._hmt || [];
    let sc;
    (function () {
        if ((sc = document.getElementById('baidu'))) {
            document.head.removeChild(sc);
        }
        const hm = document.createElement('script');
        hm.type = 'text/javascript';
        hm.async = true;
        hm.src = 'https://hm.baidu.com/hm.js?1f46ec8ab8bbb8a41ddac8ef894ec63a';
        hm.id = 'baidu';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
    })();
};

// 获取 saas 系统的 origin（一般用来跳转）
// 本地开发可以在 webpack 的 define 插件里配置 process.saasOrigin
export function getSaasOrigin() {
    let origin;
    try {
        if (process.env === 'development') {
            origin = process.saasOrigin;
        }
    } catch (e) {}
    if (!origin) {
        origin = location.origin || 'https://ent.bestsign.cn';
    }
    origin = origin.replace('cc', 'ent');
    return origin;
}
