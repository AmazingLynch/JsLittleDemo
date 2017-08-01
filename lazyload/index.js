/*
  懒加载：是指内容（在这里指的是图片）并不是一下子全部加载出来，而是根据用户行为对资源进行延迟加载。可以减少http请求数
 懒加载分为三种：
    1.第一种是纯粹的延迟加载，使用setTimeOut或setInterval进行加载延迟.
    2.第二种是条件加载，符合某些条件，或触发了某些事件才开始异步下载。
    3.第三种是可视区加载，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。
在这里，采用第三种可视区加载。利用元素的offsetTop，scrollTop和可视区大小之间的关系来达到懒加载。
注意：img元素只要设置了url就会自动发出http请求，所以这里先采用一个图片占位符，然后将图片的url信息放在img元素的自定义属性data-url里，判断出该图片需要加载则把data-url
里得内容放到url里即可实现加载。
 */

//获取到全部的img节点

var imgNodes = document.querySelectorAll('img'),
    imgArr = Array.prototype.slice.call(imgNodes,0),
    imgInfo = [];
for(var i = 0 ; i < imgArr.length; i++){
    var singleImgInfo = {};
    singleImgInfo.img = imgArr[i];
    singleImgInfo.flag = false;
    imgInfo.push(singleImgInfo);
}

function lazyLoad() {
    for (var i = 0, max = imgInfo.length; i < max; i++) {
        if (!imgInfo[i].flag) {
            var poi = getElementPoistionInWinow(imgInfo[i].img),
            y = getElementScroll().y;
        
            if (poi.y > y && poi.y < y + window.innerHeight) {
                // imgInfo[i].img.src = imgInfo[i].img.getAttribute('data-src');
                imgInfo[i].img.src = imgInfo[i].img.dataset.src;
                imgInfo[i].flag = true;
            }
        }
    }
}

function getElementPoistionInWinow(ele) {
    var top = 0,
    left = 0;
    while(ele) {//由于元素的offsetLeft属性是相对于父元素的，所以这里要使用循环求出元素相对于窗口的偏移
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent; //元素的父元素
    }
    return {
    y: top,
    x: left,
    }
}

function getElementScroll() {
    var x,
        y;
    x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return {
    x: x,
    y: y,
    }
}
//在首次加载页面时，没有触发scroll事件的情况下，执行函数，加载图片
lazyLoad();
document.addEventListener('scroll',lazyLoad,false);