// api.js
import config from '../../config'; // 导入配置

class ApiService {
  // 封装 GET 请求
  get(url: string, params: object) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${config.API_BASE_URL}${url}`,
        method: 'GET',
        data: params,
        header: {
          'Content-Type': 'application/json',
          // 可以在这里添加其他公共的请求头
          // 'Authorization': `Bearer ${token}`
        },
        success: (response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error(`请求失败，状态码: ${response.statusCode}`));
          }
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }

  // 封装 POST 请求
  post(url: any, data: any) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${config.API_BASE_URL}${url}`,
        method: 'POST',
        data: data,
        header: {
          'Content-Type': 'application/json',
          // 可以在这里添加其他公共的请求头
          // 'Authorization': `Bearer ${token}`
        },
        success: (response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error(`请求失败，状态码: ${response.statusCode}`));
          }
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }

  // 可以根据需要添加更多的 HTTP 方法
}

export default new ApiService();