var oRight = document.getElementById('right');
var clientW = oRight.clientWidth;

$('.lb-contain').css('width', function(){
    return 4 * clientW;
});
window.onresize = function(){
    clientW = oRight.clientWidth;
    $('.lb-contain img').css({
        width: clientW
    });
    $('.lb-contain').css('width', function(){
        return 4 * clientW;
    });
};
var nowIndex = 1;
var speed = 1500;
var play = function(){
    if(nowIndex == 4){
        nowIndex = 1;
        $('.lb-contain').css({
            transition: 'none',
            transform: 'translateX(0px)'
        });
        speed = 0;
    }else{
        $('.lb-contain').css({
            transition: 'transform 2s ease',
            transform: 'translateX(-'+ clientW * (nowIndex++) +'px)'
        });
        speed = 2000;
    }
    clearTimeout(timer);
    timer = setTimeout(play, speed);
};
var timer = setTimeout(play, speed);

