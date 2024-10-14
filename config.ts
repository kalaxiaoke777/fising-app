// config.js
const config = {
    // API_BASE_URL: 'https://pd52zf86723.vicp.fun',
    API_BASE_URL: 'http://127.0.0.1:1800', 
    login: '/user_management/login', // 登录验证
    weCallback: '/user_management/wechat/callback', // 登录验证
    weRegister: '/user_management/wechat/register/', // 登录验证
    getUser: '/user_management/getUser', // 获取用户信息
    updateUser: '/user_management/updateUser', // 获取用户信息
    getFish: '/fish/getFish', // 登录验证
    getFishList: '/fish/getFishList', // 分页
    getFishSingle: '/fish/getFishSingle', // 分页
    searchFish: '/fish/searchFish', // 登录验证
    addFishURL: '/fish/addFish/', // 登录验证
};
export default config;