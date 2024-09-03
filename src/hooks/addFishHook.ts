import { ref, reactive } from 'vue';

const state = reactive({
  userName: '',
  phoneNumber: '',
  startTime: '09:00',
  endTime: '18:00'
});

// 使用 state 对象来访问和修改这些值
function updateUserName(newUserName: string) {
  state.userName = newUserName;
}

function updatePhoneNumber(newPhoneNumber: string) {
  state.phoneNumber = newPhoneNumber;
}

function updateStartTime(newStartTime: string) {
  state.startTime = newStartTime;
}

function updateEndTime(newEndTime: string) {
  state.endTime = newEndTime;
}

function bindStartTimeChange(e:any) {
	updateStartTime(e.detail.value)
}
function bindEndTimeChange (e:any)  {
	updateEndTime(e.detail.value)
}

// 导出 state 对象和更新函数
export default {
  state,
  updateUserName,
  updatePhoneNumber,
  updateStartTime,
  updateEndTime,
  bindStartTimeChange,
  bindEndTimeChange
};