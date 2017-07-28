window.onload = function(){
    var oParent = document.getElementById('container');
    var imgData = {'data':[
        {'src':'1.jpg'},
        {'src':'2.jpg'},
        {'src':'3.jpg'},
        {'src':'4.jpg'},
        {'src':'5.jpg'},
        {'src':'6.jpg'},
        {'src':'7.jpg'},
        {'src':'8.jpg'},
        {'src':'9.jpg'},
        {'src':'10.jpg'}
    ]};
    imgLocation(oParent,'box')
    
    window.onscroll = function(){
        if(checkFlag()){
            for(var i = 0; i<imgData.data.length;i++){
                //创建节点，并且添加节点
                var oContent = document.createElement('div');
                oContent.className = 'box';
                oParent.appendChild(oContent);
                var oBoxImage = document.createElement('div');
                oBoxImage.className = 'box-img';
                oContent.appendChild(oBoxImage);
                var oImg = document.createElement('img');
                oImg.src = 'img/' + imgData.data[i].src;
                oBoxImage.appendChild(oImg);  
            }
            imgLocation(oParent,'box');//定位每张图片
        }
    };
}

function checkFlag(){//判断是否需要加载新的图片
    var cParent = document.getElementById('container');
    var cContent = getChildElements(cParent,'box');
    var lastContentHeight = cContent[cContent.length-1].offsetTop;//获取最后一张图片距离顶部的距离
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//挡掉的高度
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//目前可视区的高度
    if(lastContentHeight < scrollTop + pageHeight){
        return true;
    }
}

function imgLocation(oParent,pin){
    var aContent = getChildElements(oParent,pin);
    var imgWidth = aContent[0].offsetWidth;//获取每个图片框的宽度
    var cols = Math.floor(document.documentElement.clientWidth/imgWidth);//计算屏幕可以放置多少个图片框
    oParent.style.cssText = 'width:' + imgWidth*cols + 'px; margin: 0 auto;';
    var boxHeightArr = [];//存放高度
    for(var i = 0;i < aContent.length; i++){
        if(i < cols){//头行
            boxHeightArr[i] = aContent[i].offsetHeight;
        }
        else {//多出来的
            var minHeight = Math.min.apply(null,boxHeightArr);//在头行所有高度里找一个最小的高度
            var minIndex = getMinHeightLocation(boxHeightArr,minHeight);//找到这个最小高度的索引
            aContent[i].style.position = 'absolute';//给这个元素定位到头行的下方
            aContent[i].style.top = minHeight + 'px';
            aContent[i].style.left = aContent[minIndex].offsetLeft + 'px';
            boxHeightArr[minIndex] += aContent[i].offsetHeight;//相应的这个高度也要增加
        }
        
    }
}

function  getMinHeightLocation(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minHeight){
            return i;
        }
    }
}

//获取parent节点下class为content值得子节点集合
function getChildElements(parent,content){
    var aContent = [];
    var allContent = parent.getElementsByTagName('*')
    for (var i = 0;i < allContent.length;i++){
        if(allContent[i].className === content){
            aContent.push(allContent[i]);
        }
    }
    return aContent;
}
