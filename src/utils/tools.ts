const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
const getOpenid = () => {
    const register = uni.getStorageSync('register');
    if (!register) {

        uni.switchTab({
            url: '/pages/my/my'
        })
        uni.showModal({
            title: '提示',
            content: '请先登录',
            showCancel: false,
        });
        return null;
    }
    try {
        return JSON.parse(register || '{}').openid;
    } catch (e) {
        return null;
    }
};
export { createUUID, getOpenid };