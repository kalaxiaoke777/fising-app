import { ref, reactive } from 'vue';

const state = reactive({
  userName: '',
  phoneNumber: '',
  startTime: '09:00',
  endTime: '18:00',
  value1:"",
  data:[],
  opthions:[
    {
      value:"鲫鱼",
      label:"鲫鱼"
    },
    {
      value:"草鱼",
      label:"草鱼"
    },
    {
      value:"鲤鱼",
      label:"鲤鱼"
    },
    {
      value:"青鱼",
      label:"青鱼"
    },
    {
      value:"鲢鳙",
      label:"鲢鳙"
    },
    {
      value:"鲈鱼",
      label:"鲈鱼"
    },
    {
      value:"鳜鱼",
      label:"鳜鱼"
    },
    {
      value:"马口",
      label:"马口"
    },
    {
      value:"桃花",
      label:"马口"
    },
    {
      value:"罗非",
      label:"罗非"
    },
    {
      value:"鲶鱼",
      label:"鲶鱼"
    },
    {
      value:"黑鱼",
      label:"黑鱼"
    },
    {
      value:"翘嘴",
      label:"翘嘴"
    },
    {
      value:"白条",
      label:"白条"
    },
  ]
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