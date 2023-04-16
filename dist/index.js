"use strict";var c=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var I=Object.prototype.hasOwnProperty;var S=(a,i)=>{for(var e in i)c(a,e,{get:i[e],enumerable:!0})},P=(a,i,e,n)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of x(i))!I.call(a,o)&&o!==e&&c(a,o,{get:()=>i[o],enumerable:!(n=b(i,o))||n.enumerable});return a};var _=a=>P(c({},"__esModule",{value:!0}),a);var A={};S(A,{ApnsClient:()=>u,Errors:()=>g,Host:()=>T,Notification:()=>p,Priority:()=>l,PushType:()=>d,SilentNotification:()=>m});module.exports=_(A);var y=require("jsonwebtoken"),v=require("events"),k=require("fetch-http2");var g=(t=>(t.badCertificate="BadCertificate",t.badCertificateEnvironment="BadCertificateEnvironment",t.badCollapseId="BadCollapseId",t.badDeviceToken="BadDeviceToken",t.badExpirationDate="BadExpirationDate",t.badMessageId="BadMessageId",t.badPath="BadPath",t.badPriority="BadPriority",t.badTopic="BadTopic",t.deviceTokenNotForTopic="DeviceTokenNotForTopic",t.duplicateHeaders="DuplicateHeaders",t.error="Error",t.expiredProviderToken="ExpiredProviderToken",t.forbidden="Forbidden",t.idleTimeout="IdleTimeout",t.internalServerError="InternalServerError",t.invalidProviderToken="InvalidProviderToken",t.invalidPushType="InvalidPushType",t.invalidSigningKey="InvalidSigningKey",t.methodNotAllowed="MethodNotAllowed",t.missingDeviceToken="MissingDeviceToken",t.missingProviderToken="MissingProviderToken",t.missingTopic="MissingTopic",t.payloadEmpty="PayloadEmpty",t.payloadTooLarge="PayloadTooLarge",t.serviceUnavailable="ServiceUnavailable",t.shutdown="Shutdown",t.tooManyProviderTokenUpdates="TooManyProviderTokenUpdates",t.tooManyRequests="TooManyRequests",t.topicDisallowed="TopicDisallowed",t.unknownError="UnknownError",t.unregistered="Unregistered",t))(g||{});var w=3,h="ES256",N=55*60*1e3,T=(e=>(e.production="api.push.apple.com",e.development="api.sandbox.push.apple.com",e))(T||{}),u=class extends v.EventEmitter{constructor(e){super();this.team=e.team,this.keyId=e.keyId,this.signingKey=e.signingKey,this.defaultTopic=e.defaultTopic,this.host=e.host??"api.push.apple.com",this._token=null,this.on("ExpiredProviderToken",()=>this._resetSigningToken())}send(e){return this._send(e)}sendMany(e){let n=e.map(o=>this._send(o).catch(r=>({error:r})));return Promise.all(n)}async _send(e){let n=encodeURIComponent(e.deviceToken),o=`https://${this.host}/${w}/device/${n}`,r={method:"POST",headers:{authorization:`bearer ${this._getSigningToken()}`,"apns-push-type":e.pushType,"apns-priority":e.priority.toString(),"apns-topic":e.options.topic??this.defaultTopic},body:JSON.stringify(e.buildApnsOptions()),keepAlive:5e3};e.options.expiration&&(r.headers["apns-expiration"]=typeof e.options.expiration=="number"?e.options.expiration.toFixed(0):(e.options.expiration.getTime()/1e3).toFixed(0)),e.options.collapseId&&(r.headers["apns-collapse-id"]=e.options.collapseId);let f=await(0,k.fetch)(o,r);return this._handleServerResponse(f,e)}async _handleServerResponse(e,n){if(e.status===200)return n;let o;try{o=await e.json()}catch{o={reason:"UnknownError"}}throw o.statusCode=e.status,o.notification=n,this.emit(o.reason,o),this.emit("Error",o),o}_getSigningToken(){if(this._token&&Date.now()-this._token.timestamp<N)return this._token.value;let e={iss:this.team,iat:Math.floor(Date.now()/1e3)},n=(0,y.sign)(e,this.signingKey,{algorithm:h,header:{alg:h,kid:this.keyId}});return this._token={value:n,timestamp:Date.now()},n}_resetSigningToken(){this._token=null}};var d=(s=>(s.alert="alert",s.background="background",s.voip="voip",s.complication="complication",s.fileprovider="fileprovider",s.mdm="mdm",s.liveactivity="liveactivity",s))(d||{});var l=(e=>(e[e.immediate=10]="immediate",e[e.throttled=5]="throttled",e))(l||{});var p=class{constructor(i,e){this.deviceToken=i,this.options=e??{}}get pushType(){return this.options.type??"alert"}get priority(){return this.options.priority??10}buildApnsOptions(){let i={aps:this.options.aps??{}};this.options.alert&&(i.aps.alert=this.options.alert),typeof this.options.contentAvailable=="boolean"&&(i.aps["content-available"]=1),(typeof this.options.sound=="string"||typeof this.options.sound=="object")&&(i.aps.sound=this.options.sound),typeof this.options.category=="string"&&(i.aps.category=this.options.category),typeof this.options.badge=="number"&&(i.aps.badge=this.options.badge),typeof this.options.threadId=="string"&&(i.aps["thread-id"]=this.options.threadId);for(let e in this.options.data)i[e]=this.options.data[e];return i}};var m=class extends p{constructor(i,e={}){super(i,{contentAvailable:!0,type:"background",priority:5,...e})}};0&&(module.exports={ApnsClient,Errors,Host,Notification,Priority,PushType,SilentNotification});