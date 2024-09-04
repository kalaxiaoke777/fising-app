<template>
	<view class="addFish">
		<form @submit="formSubmit" @reset="formReset" class="myForm">
			<view class="title">添加标点</view>

			<view class="uni-form-item uni-column myItem">
				<view>鱼塘名称</view>
				<input class="uni-input" name="name" placeholder="请输入用户名" />
			</view>

			<view class="uni-form-item uni-column myItem">
				<view>价格</view>
				<input class="uni-input" name="price" placeholder="请输入鱼塘价格" />
			</view>

			<view class="uni-form-item uni-column myItem">
				<view class="title">鱼塘类型</view>
				<radio-group name="radio">
					<label>
						<radio value="natural" /><text>自然</text>
						<radio value="wild" /><text>野塘</text>

					</label>
					<label>
						<radio value="happy" /><text>欢乐</text>
						<radio value="black_pit" /><text>黑坑</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column myItem">
				<view>联系方式</view>
				<input class="uni-input" name="number" placeholder="请输入号码" />
			</view>
			<view class="uni-form-item uni-column">
				<view>评价</view>
				<slider :min=0 :max=5 name="slider" show-value></slider>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">

					<view class="uni-list-cell-db timeItem">
						<view class="uni-list-cell-left">
							开业时间
						</view>
						<picker mode="time" :value="state.startTime" @change="bindStartTimeChange">
							<view class="uni-input">{{ state.startTime }}</view>
						</picker>
					</view>

					<view class="uni-list-cell-db timeItem">
						<view class="uni-list-cell-left">
							结束时间
						</view>
						<picker mode="time" :value="state.endTime" @change="bindEndTimeChange">
							<view class="uni-input">{{ state.endTime }}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="uni-btn-v">
				<button size="mini" type="primary" form-type="submit">注册</button>
				<button size="mini" form-type="reset">清空</button>
			</view>
		</form>
	</view>
	<view class="img">
		<img :src="image_url" alt="Fish Image" style="width: 100%; height: 100%; object-fit: cover;" />
	</view>

</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import ApiService from "../../utils/request";
import config from "../../../config";
import { useRegisterStore } from '../../stores/index';
import hooks from '../../hooks/addFishHook';
const { state, updateUserName, updatePhoneNumber, updateStartTime, updateEndTime, bindStartTimeChange, bindEndTimeChange } = hooks;
const registerStore = useRegisterStore();
// 中国手机号码正则表达式
const regexChina = /^1[3-9]\d{9}$/;
const {API_BASE_URL,weRegister } = config
const image_url = ref(`${API_BASE_URL}/static/fish.png`);

const formSubmit = (v: any) => {
	// 从事件对象中提取表单数据
	const { number, user } = v.target.value;

	// 获取用户输入
	const phoneNumber = number;
	const userName = user;

	// 验证用户输入
	if (!userName) {
		uni.showModal({
			content: '请填写用户名',
			showCancel: false
		});
		return;
	}

	if (!phoneNumber) {
		uni.showModal({
			content: '请填写电话号',
			showCancel: false
		});
		return;
	}

	// 手机号码格式验证
	const isValidPhoneNumber = regexChina.test(phoneNumber);

	if (!isValidPhoneNumber) {
		uni.showModal({
			content: '电话号格式不正确！',
			showCancel: false
		});
		return;
	}
	console.log(69, registerStore.openid, registerStore.session_key);

	const data: object = {
		"username": userName,
		"phoneNumber": phoneNumber,
		"openId": registerStore.openid,
		"userKey": registerStore.session_key
	}
	ApiService.post(weRegister, data)
		.then((response: any) => {
			if (response.code === 50001) {
				// 不存在则直接弹出填入手机号进行注册
				uni.navigateTo({ url: '/pages/login/register' });
			} else {
				// 判断是否存在用户，如果存在则返回信息，持久化
			}
			console.log('数据获取成功:', response);
			// 处理成功的响应数据
		})
		.catch(error => {
			console.error('请求失败:', error);
			// 处理请求错误
		});
}
const formReset = () => {
	updateStartTime('09:00')
	updateEndTime('18:00')
}
onMounted(() => {

})


</script>

<style lang="scss" scoped>
.addFish {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;

	.myForm {
		display: flex;
		justify-content: center;
		width: 80vw;
		height: 100vh;
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: #fff;
		text-align: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

		.myItem {
			display: flex;
			flex-direction: row;
		}
		.uni-list{
			.timeItem{
                display: flex;
                flex-direction: row;
				.uni-list-cell-left{
					width: 50%;
				}
			}
		}

		.uni-btn-v {
			display: flex;
			/* 启用 flexbox 布局 */
			gap: 10px;

			/* 按钮之间的间距，可根据需要调整 */
			button {
				width: 40%;
				text-align: center;
			}
		}
	}

}

.img {
	width: 100%;
	height: 100%;
	position: absolute;
	/* 确保它能覆盖整个视口 */
	top: 0;
	left: 0;
	z-index: -1;
	/* 合适的 z-index 值 */
}
</style>