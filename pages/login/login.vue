<template>
	<view class="content">
		<view class="header">
			<image src="/static/logo.png"></image>
		</view>
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/phone.png"></image>
				<input class="sl-input" v-model="userInfo.username" type="number" maxlength="11" placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/password.png"></image>
				<input class="sl-input" v-model="userInfo.password" type="text" maxlength="32" placeholder="输入密码" password="true" />
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					username: '',
					password: ''
				}
			};
		},
		created() {
			const {
				token,
				username,
				password
			} = uni.getStorageSync('userInfo') || {}
			if (token) {
				uni.redirectTo({
					url: '/pages/index/index',
				})
				return
			}
			this.userInfo = {
				username,
				password
			}
		},
		methods: {
			bindLogin() {
				uni.request({
					url: 'http://175.24.113.82:7001/api/login',
					data: this.userInfo,
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						const {
							code,
							data,
							msg
						} = res.data
						if (code === 0) {
							uni.setStorageSync('userInfo', {
								token: data.token,
								username: data.userInfo.username || '',
								password: data.userInfo.password || ''
							})
							uni.redirectTo({
								url: '/pages/index/index',
							})
						} else {
							uni.showToast({
								title: msg,
								icon: 'none'
							});
						}
					}
				});

			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
