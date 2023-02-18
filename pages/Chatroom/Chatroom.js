import TIM from '../../TUIKit/lib/tim-wx-sdk';
import { genTestUserSig }  from '../../TUIKit/debug/GenerateTestUserSig';
import TIMUploadPlugin from '../../TUIKit/lib/tim-upload-plugin';
import TIMProfanityFilterPlugin from '../../TUIKit/lib/tim-profanity-filter-plugin';

Page({
    data: {
        config: {
            userID: '1', //User ID
            SDKAPPID: 1400793258, // Your SDKAppID
            SECRETKEY: 'dd041b31c2053b81a32ebd59ec845faaacc2bf19c7bd5317e7df110c09215b73', // Your secretKey
            EXPIRETIME: 604800,
        }
    },

    onLoad() {
        const userSig = genTestUserSig(this.data.config).userSig 
        wx.$TUIKit = TIM.create({
            SDKAppID: this.data.config.SDKAPPID
        })
        wx.$chat_SDKAppID = this.data.config.SDKAPPID;
        wx.$chat_userID = this.data.config.userID;
        wx.$chat_userSig = userSig;
        wx.$TUIKitTIM = TIM;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        wx.$TUIKit.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });
        wx.$TUIKit.login({
            userID: this.data.config.userID,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onUnload() {
        wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onSDKReady() {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    }
});