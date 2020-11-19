(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{989:function(e,t,i){"use strict";i.r(t);var o=i(0),r=i.n(o),a=i(200),s=i(171),n=i(376);function d(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,o)}return i}function p(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?d(Object(i),!0).forEach((function(t){l(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var u=function(e){var t,o;function d(t){var i;return(i=e.call(this,t)||this).pause=i.pause.bind(c(i)),i.play=i.play.bind(c(i)),i.playVideoIfNeeded=i.playVideoIfNeeded.bind(c(i)),i.state={playedOnce:!1,playing:!1,reactPlayerLoaded:!1,vimeoPlayerLoaded:!1,hlsPlayerLoaded:!1},i}o=e,(t=d).prototype=Object.create(o.prototype),t.prototype.constructor=t,t.__proto__=o;var l=d.prototype;return l.componentDidMount=function(){this.dynamiclyImportVideoPlayers()},l.dynamiclyImportVideoPlayers=function(){var e=this;a.a&&a.a.ReactPlayer||i.e(48).then(i.t.bind(null,966,7)).then((function(t){a.a.ReactPlayer=t.default,e.setState({reactPlayerLoaded:!0}),e.playVideoIfNeeded()})),a.a&&a.a.Vimeo||!this.props.videoUrl||!this.props.videoUrl.includes("vimeo.com")||Promise.all([i.e(0),i.e(49)]).then(i.bind(null,983)).then((function(t){a.a.Vimeo={Player:t.default},e.setState({vimeoPlayerLoaded:!0}),e.playVideoIfNeeded()})),a.a&&a.a.Hls||!this.isHLSVideo()||i.e(55).then(i.t.bind(null,985,7)).then((function(t){a.a.Hls=t.default,e.setState({hlsPlayerLoaded:!0}),e.playVideoIfNeeded()}))},l.isHLSVideo=function(){return this.props.videoUrl&&(this.props.videoUrl.includes("/hls")||this.props.videoUrl.includes(".m3u8"))},l.shouldUseHlsPlayer=function(){return this.isHLSVideo()&&!s.a.isiOS()},l.shouldForceVideoForHLS=function(){return this.isHLSVideo()&&s.a.isiOS()},l.componentWillReceiveProps=function(e){e.playing&&this.setState({playedOnce:!0}),this.playVideoIfNeeded(e)},l.componentDidUpdate=function(e){e.currentIdx!==this.props.currentIdx&&this.fixIFrameTabIndexIfNeeded(),"image"===e.type&&"video"===this.props.type&&this.dynamiclyImportVideoPlayers(),this.playVideoIfNeeded()},l.play=function(){this.props.playVideo(this.props.idx)},l.pause=function(){this.props.pauseVideo()},l.playVideoIfNeeded=function(e){void 0===e&&(e=this.props);try{e.playingVideoIdx!==this.props.idx||this.isPlaying||(this.videoElement=this.videoElement||a.a.document.querySelector("#video-"+this.props.id+" video"),this.videoElement&&(this.isPlaying=!0,this.videoElement.play(),s.a.isVerbose()&&console.log("[VIDEO] Playing video #"+this.props.idx,this.videoElement)))}catch(t){console.error("[VIDEO] Could not play video #"+this.props.idx,this.videoElement,t)}},l.createPlayerElement=function(){var e=this;if(!a.a||!a.a.ReactPlayer)return null;var t=a.a.ReactPlayer,i=this.props.style.ratio>=this.props.cubeRatio,o={width:i?"100%":"auto",height:i?"auto":"100%"};if(this.props.styleParams.cubeImages&&"fill"===this.props.styleParams.cubeType){var s=[o.height,o.width];o.width=s[0],o.height=s[1],o.position="absolute",o.margin="auto",o.minHeight="100%",o.minWidth="100%",o.left="-100%",o.right="-100%",o.top="-100%",o.bottom="-100%"}var d=this.props.videoUrl?this.props.videoUrl:this.props.createUrl(n.a.urlSizes.RESIZED,n.a.urlTypes.VIDEO);return r.a.createElement(t,{className:"gallery-item-visible video gallery-item",id:"video-"+this.props.id,width:"100%",height:"100%",url:d,alt:this.props.alt?this.props.alt:"untitled video",loop:!!this.props.styleParams.videoLoop,ref:function(t){return e.video=t},volume:this.props.styleParams.videoSound?.8:0,playing:this.props.playing,onEnded:function(){e.setState({playing:!1}),e.props.actions.eventsListener(n.a.events.VIDEO_ENDED,e.props)},onPause:function(){e.setState({playing:!1})},onError:function(t){e.props.actions.eventsListener(n.a.events.VIDEO_ERROR,p(p({},e.props),{},{videoError:t}))},playbackRate:Number(this.props.styleParams.videoSpeed)||1,onPlay:function(){e.props.actions.eventsListener(n.a.events.VIDEO_PLAYED,e.props),e.setState({playing:!0})},onReady:function(){e.playVideoIfNeeded(),e.fixIFrameTabIndexIfNeeded(),e.props.actions.setItemLoaded(),e.setState({ready:!0})},config:{file:{attributes:{muted:!this.props.styleParams.videoSound,preload:"metadata",poster:this.props.createUrl(n.a.urlSizes.RESIZED,n.a.urlTypes.HIGH_RES),style:o,type:"video/mp4"},forceHLS:this.shouldUseHlsPlayer(),forceVideo:this.shouldForceVideoForHLS()}},key:"video-"+this.props.id})},l.fixIFrameTabIndexIfNeeded=function(){if(this.props.isExternalVideo){var e=a.a.document&&a.a.document.getElementById("video-"+this.props.id),t=e&&e.getElementsByTagName("iframe"),i=t&&t[0];i&&(this.props.currentIdx===this.props.idx?i.setAttribute("tabIndex","0"):i.setAttribute("tabIndex","-1"))}},l.render=function(){var e=this.props.hover,t="gallery-item-content gallery-item-visible gallery-item-preloaded gallery-item-video gallery-item video-item"+(s.a.isiPhone()?" ios":"");this.state.playing&&(t+=" playing");var i=r.a.createElement("div",{className:"pro-circle-preloader",key:"video-preloader-"+this.props.idx}),o=this.props.imageDimensions||{},a=(o.marginLeft,o.marginTop,function(e,t){if(null==e)return{};var i,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)i=a[o],t.indexOf(i)>=0||(r[i]=e[i]);return r}(o,["marginLeft","marginTop"])),d=r.a.createElement("div",{className:t+" animated fadeIn ","data-hook":"video_container-video-player-element",key:"video_container-"+this.props.id,style:s.a.deviceHasMemoryIssues()||this.state.ready?{backgroundColor:"black"}:p({backgroundImage:"url("+this.props.createUrl(n.a.urlSizes.RESIZED,n.a.urlTypes.HIGH_RES)+")"},a)},this.createPlayerElement(),this.props.videoControls,i);return r.a.createElement("div",{key:"video-and-hover-container"+this.props.idx},[d,e])},d}(i(134).a);t.default=u}}]);