<template>
    <view>
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V itop">
                <cover-image class="auth_img" src="../../static//logo.png">
                </cover-image>
            </view>
            <view class="flex-item flex-item-V icenter">B</view>
        </view>
    </view>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.itop{
    height: 40vh;
    position: relative;
    background-color: pink;
    .auth_img{
        width: 100px; 
        height: 100px; 
        object-fit: cover; 
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>