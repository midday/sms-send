<template>
	<view class="container">
		<view class="phone-wrap">
			<view class="phone" @click="copyPhoneNumber">{{this.phoneInfo.phoneNumber || '请加载手机号'}}</view>
			<view class="belong">{{belong || '归属地'}}</view>
		</view>
		<view class="salutation-wrap">
			<label class="salutation-label">称谓：</label>
			<input class="salutation-input" v-model="salutation" type="text" />
		</view>
		<view class="btn-wrap">
			<button class="btn" type="default" @click="clickNotSendBtn">不发送，下一个</button>
			<button class="btn" type="default" @click="clickSendBtn">发送，下一个</button>
		</view>
		<view class="btn-wrap">
			<button class="btn" :type="index === currentTemplateIndex ? 'primary' : 'default'" @click="setTemplateIndex(index)" v-for="(item, index) in templateList" :key="item._id">{{item.name}}</button>
		</view>
		<textarea class="template-content" placeholder="模板内容" @blur="updateTemplate" v-model="templateList[currentTemplateIndex].content" />
		</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}, // 用户信息
				phoneInfo: {}, // 手机信息
				salutation: '',// 称呼
				templateList: [
					{
						name: '模板1',
						content: ''
					},
					{
						name: '模板2',
						content: ''
					},
					{
						name: '模板3',
						content: ''
					}
				],// 模板列表
				currentTemplateIndex: 0, // 当前模板ID
			}
		},
		onNavigationBarButtonTap() {
			uni.setStorageSync('userInfo', {
				...this.userInfo,
				token: ''
			})
			plus.runtime.quit();
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			const templateIndex = uni.getStorageSync('templateIndex')
			if (typeof templateIndex !== 'number') {
				this.setTemplateIndex(0)
			} else {
				this.currentTemplateIndex = templateIndex
			}
			this.getTemplateList()
		},
		computed: {
			belong() {
				return this.phoneInfo.area && this.phoneInfo.sp ? `${this.phoneInfo.area} ${this.phoneInfo.sp}` : ''
			}
		},
		methods: {
			// 复制手机号码
			copyPhoneNumber() {
				if (this.phoneInfo.phoneNumber) {
					uni.setClipboardData({
						data: this.phoneInfo.phoneNumber
					});
				}
			},
			// 设置模板索引
			setTemplateIndex(index) {
				this.currentTemplateIndex = index
				uni.setStorageSync('templateIndex', index)
			},
			// 更新模板
			updateTemplate() {
				uni.request({
					url: 'http://175.24.113.82:7001/api/updateTemplate',
					header: {
						'Authorization': this.userInfo.token
					},
					data: {
						phoneNumber: this.userInfo.username,
						...this.templateList[this.currentTemplateIndex]
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						const { code, data, msg } = res.data
						if(code === 0) {
						} else {
							if (code === 401) {
								this.jumpLoginPage()
							} else {
								uni.showToast({
									title: msg,
									icon: 'none'
								});
							}
						}
					},
				});
			},
			// 获取模板列表
			getTemplateList() {
				uni.request({
					url: 'http://175.24.113.82:7001/api/getTemplateList',
					header: {
						'Authorization': this.userInfo.token
					},
					data: {
						pageNo: 1,
						pageSize: 100,
						phoneNumber: this.userInfo.username
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						const { code, data, msg } = res.data
						if(code === 0) {
							this.templateList = data.data
						} else {
							if (code === 401) {
								this.jumpLoginPage()
							} else {
								uni.showToast({
									title: msg,
									icon: 'none'
								});
							}
						}
					},
				});
			},
			// 发送信息
			sendMessage() {
				if (uni.getSystemInfoSync().platform === 'android') {
					const msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
					msg.to = [this.phoneInfo.phoneNumber];
					msg.body = this.salutation + this.templateList[this.currentTemplateIndex].content,
					plus.messaging.sendMessage( msg );
				}
			},
			// 点击发送按钮
			clickSendBtn() {
				if (this.phoneInfo.phoneNumber) {
					this.sendMessage()
					this.updatePhone({
						...this.phoneInfo,
						sendPhoneNumber: this.userInfo.username,
						sendContent: this.salutation + this.templateList[this.currentTemplateIndex].content,
						sendTime: new Date(),
						status: 'SENDED'
					})
				} else {
					this.getNextPhoneNumber()
				}
			},
			// 点击不发送按钮
			clickNotSendBtn() {
				if (this.phoneInfo.phoneNumber) {
					this.updatePhone({
						...this.phoneInfo,
						status: 'INVALID'
					})
				} else {
					this.getNextPhoneNumber()
				}
			},
			// 获取下一个电话号码
			getNextPhoneNumber() {
				uni.request({
					url: 'http://175.24.113.82:7001/api/getNextPhoneNumber',
					header: {
						'Authorization': this.userInfo.token
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						const { code, data, msg } = res.data
						if (res.data.code === 401) {
							this.jumpLoginPage()
							return
						}
						if(code === 0) {
							const { _id, phoneNumber, area, sp } = data
							this.phoneInfo = {
								_id,
								phoneNumber,
								area,
								sp
							}
						} else {
							if (code === 401) {
								this.jumpLoginPage()
							} else {
								uni.showToast({
									title: msg,
									icon: 'none'
								});
							}
						}
					}
				});
			},
			// 更新手机号
			updatePhone(data) {
				uni.request({
					url: 'http://175.24.113.82:7001/api/updatePhone',
					header: {
						'Authorization': this.userInfo.token
					},
					data: {
						...data
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading()
						if (res.data.code === 401) {
							this.jumpLoginPage()
							return
						}
						if (res.data.code === 0) {
							this.getNextPhoneNumber()
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			// 跳转登录页面
			jumpLoginPage() {
				uni.setStorageSync('userInfo', {
					...this.userInfo,
					token: ''
				})
				uni.redirectTo({
					url: '/pages/login/login',
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 50rpx 30rpx;
	}
	.phone-wrap {
		text-align: center;
		color: #333;
	}
	.phone {
		line-height: 50rpx;
		font-weight: bold;
		font-size: 50rpx;
	}
	.belong {
		margin-top: 20rpx;
		line-height: 40rpx;
		font-size: 40rpx;
	}
	.salutation-wrap {
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
	}
	.salutation-label {
		font-size: 32rpx;
	}
	.salutation-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		height: 50rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}
	.btn-wrap {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.btn {
		margin: 10rpx;
		flex: 1;
	}
	.btn:first-child {
		margin-left: 0;
	}
	.btn:last-child {
		margin-right: 0;
	}
	.template-content {
		box-sizing: border-box;
		margin-top: 20rpx;
		display: block;
		height: 400rpx;
		width: 100%;
		padding: 10rpx;
		border-radius: 10rpx;
		background-color: #F8F8F8;
	}
</style>
