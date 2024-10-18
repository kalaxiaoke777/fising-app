import { reactive } from 'vue';


export const useAI = () => {
    const state = reactive({
        userInput: '',
        analysisResult: "",
        isResult: false,
        range: [
            { value: 0, text: "篮球" },
            { value: 1, text: "足球" },
            { value: 2, text: "游泳" },
        ],
        value: 0 as any,
    })

    // 提交问题的方法
    const submitQuestion = () => {
        if (state.value == "") {
            uni.showToast({
                title: '请选择侧重类型',
                icon: 'none'
            })
            return
        }

        uni.showLoading({
            title: '加载中',
            mask: true
        })
        setTimeout(() => {
            state.isResult = true
            uni.hideLoading()
        }, 1000)

    }
    const change = (e: any) => {


    }
    return {
        state,
        submitQuestion,
        change
    };
}
