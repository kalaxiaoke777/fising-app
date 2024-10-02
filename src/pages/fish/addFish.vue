<template>
	<view class="addFish">
		<form @submit="formSubmit" @reset="formReset" class="myForm">
			<view class="title" style="padding-top: 10px; text-align: center;">添加标点</view>

			<view class="uni-form-item uni-column myItem">
				<view class="myText">鱼塘名称:</view>
				<input class="uni-input" name="name" placeholder="请输入鱼塘名(必填)" />
			</view>

			<view class="uni-form-item uni-column myItem">
				<view class="myText">价格:</view>
				<input class="uni-input" name="price" placeholder="请输入鱼塘价格（元/次）" />
			</view>

			<view class="uni-form-item uni-column myItem">
				<view class="title myText">鱼塘类型:</view>
				<radio-group name="poundType">
					<label>
						<radio value="natural" class="myRadio" /><text>自然</text>
						<radio value="wild" class="myRadio" /><text>野塘</text>
						<radio value="happy" class="myRadio" /><text>欢乐</text>
						<radio value="black_pit" class="myRadio" /><text>黑坑</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column myItem">
				<view class="myText">联系方式:</view>
				<input class="uni-input" name="number" placeholder="请输入号码" />
			</view>
			<view class="uni-form-item uni-column " style="padding-top: 10px">
				<view class="myText drz">评价:</view>
				<slider backgroundColor="#000000" block-color="#814d59" :block-size="20" class="mySlider" :min=0 :max=5
					name="slider" show-value></slider>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">

					<view class="uni-list-cell-db timeItem myItem">
						<view class="uni-list-cell-left drz">
							开业时间
						</view>
						<picker mode="time" :value="state.startTime" @change="bindStartTimeChange">
							<view class="uni-input">{{ state.startTime }}</view>
						</picker>
					</view>

					<view class="uni-list-cell-db timeItem myItem">
						<view class="uni-list-cell-left drz">
							结束时间
						</view>
						<picker mode="time" :value="state.endTime" @change="bindEndTimeChange">
							<view class="uni-input">{{ state.endTime }}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="uni-form-item uni-column myItem">
				<view class="title myText">类型:</view>
				<radio-group name="type">
					<label>
						<radio value="private" class="myRadio" />私人钓点<text></text>
						<radio value="public" class="myRadio" /><text>公开钓点</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column myItem">
				<view class="title myText">描述:</view>

			</view>
			<view class="uni-form-item uni-textarea textarea">
				<textarea name="text" style="padding-left: 10px;" placeholder-style="color:#FFF"
					placeholder="请输入描述信息" />
			</view>



			<view class="uni-form-item uni-column myItem">
				<view class="title myText">鱼种:</view>
			</view>
			<view class="uni-form-item uni-column">
				<uni-section title="基础多选" type="line" style="width: 40vw;">
					<mySelect ref="RefChild" v-model="state.value1" collapse-tags :collapse-tags-num="3" multiple
						dataKey="label" dataValue="value" :localdata="data" @change="change" />
				</uni-section>
			</view>


			<view class="uni-btn-v myItem">
				<button size="mini" type="primary" form-type="submit"
					style="background-color:rgba(124, 0, 13, 1);">注册</button>
				<button size="mini" form-type="reset">清空</button>
			</view>
		</form>
	</view>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, onBeforeMount } from 'vue';
import ApiService from "../../utils/request";
import config from "../../../config";
import { useRegisterStore } from '../../stores/index';
import hooks from '../../hooks/addFishHook';
import mySelect from "../../components/addPoint/select.vue";
const { state, updateUserName, updatePhoneNumber, updateStartTime, updateEndTime, bindStartTimeChange, bindEndTimeChange } = hooks;
const registerStore = useRegisterStore();
// 中国手机号码正则表达式
const regexChina = /^1[3-9]\d{9}$/;
const { API_BASE_URL, weRegister } = config
const image_url = ref(`${API_BASE_URL}/static/fish.png`);
const data = ref([{}])
const RefChild = ref()
const fishType = ref()
const discribe = ref()

interface ToolsProps {
	func: any
}
const props = defineProps({
	func: {
		type: Object as () => ToolsProps['func'],
		required: true
	}
});

const change = (e: any) => {
	fishType.value = e
}
const formDataText = (): string => {
	return JSON.stringify(discribe.value)
}
const inputText = (v: any) => {
	discribe.value = v.detail.value
}
const selectTable = () => {
	if (RefChild.value) {
		RefChild.value.clearVal();
	}
}

const formSubmit = (v: any) => {
	// 从事件对象中提取表单数据
	let { name, number, poundType, price, type, slider, text } = v.target.value;
	console.log(v.target.value, 144);


	// 验证用户输入
	if (name === '') {
		uni.showModal({
			content: '请填写鱼塘名称',
			showCancel: false
		});
		return;
	}
	if (price !== '') {
		if (isNaN(price)) {
			uni.showModal({
				content: '请填写数字价格!',
				showCancel: false
			});
			return;
		}

	}

	if (type === '') {
		uni.showModal({
			content: '请勾选类型',
			showCancel: false
		});
		return;
	}

	if (poundType === '') {
		uni.showModal({
			content: '请勾选鱼塘类型',
			showCancel: false
		});
		return;
	}
	if (number !== '') {
		const isValidPhoneNumber = regexChina.test(number);
		if (!isValidPhoneNumber) {
			uni.showModal({
				content: '电话号格式不正确！',
				showCancel: false
			});
			return;
		}

	}
	if (slider === '') {
		slider = 0
	}


	const data: object = {
		name,
		number,
		poundType,
		price,
		type,
		slider,
		fishType: fishType.value,
		text,
		startTime: state.startTime,
		endTime: state.endTime,
	}

	props.func.addFish(data)
}
const formReset = () => {
	updateStartTime('09:00')
	updateEndTime('18:00')
	selectTable()
}

onBeforeMount(() => {
	setTimeout(() => {
		data.value = state.opthions
	}, 500);
})
onMounted(() => {

})



</script>

<style lang="scss" scoped>
body,
html {
	margin: 0;
	padding: 0;
	height: 100%;
}

.drz {
	display: inline-block;
	width: 17vw;
	text-align: left;
	padding-left: 14px;
}

.addFish {
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0;
	/* 去掉默认的边距 */
	padding: 20px;
	/* 设置内容的内边距 */
	min-height: 100vh;
	/* 确保页面至少有 100vh 的高度 */
	font-size: 16px;
	background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
	background-size: cover;

	.myForm {
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(6px);
		color: rgba(124, 0, 13, 1);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

		.textarea {
			background: rgba(124, 0, 13, 0.5);
		}

		input {
			position: fixed;
			padding-left: 10px;
			right: 16%;
			background: rgba(124, 0, 13, 0.5);
			backdrop-filter: blur(10px);
			border-radius: 10px;
		}

		.mySlider {
			position: relative;
			left: 10px;
			border-radius: 6px;
			background: rgba(124, 0, 13, 0.5);
		}

		.myItem {
			display: flex;
			flex-direction: row;
			padding-top: 20px;

			.myText {
				display: inline-block;
				width: 23vw;
				text-align: left;
				padding-left: 14px;
			}

			.myRadio {
				// display: none;
				transform: scale(0.7)
			}
		}

		.uni-list {
			.timeItem {
				display: flex;
				flex-direction: row;

				.uni-list-cell-left {
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
</style>