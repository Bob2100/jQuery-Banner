(function($){

    //初始化第一张轮播图
    var index = 0;
    var currentIndex = 0;

    function changeImg(index, cur, obj){
        var direc = '';
        var direcOld = '';

        if(cur > index){//上一张
            direc = '1200px';
            direcOld = '-1200px';
        }

        if(cur < index || obj === 'timer'){//下一张，定时器过来的统一按下一张处理
            direc = '-1200px';
            direcOld = '1200px';
        }

        $($('.banner')[index]).addClass('active').css({left:direc});

        $($('.banner')[index]).animate({left:'0'}, '1000');

        $($('.banner')[cur]).animate({left: direcOld}, '1000', function(){
            $($('.banner')[cur]).removeClass('active').css({left: '0'});

            //重新赋值当前图片
            currentIndex = index;
        });


        $('.dot span').removeClass('active');
        $($('.dot span')[index]).addClass('active');

    }


    function next(obj){
        ++index;
        //到达最后一张时，下一张按钮失效
        if(index == $('.banner').length && 'timer' != obj){
            index = $('.banner').length - 1;
            return;
        }else if(index == $('.banner').length && 'timer' === obj){
            //由定时器调用的
            index = 0;
        }
        changeImg(index, currentIndex, obj);
    }

    //下一张
    $('.next').click(next);

    //上一张
    $('.prev').click(function(){
        --index;
        //到达第一张时，上一张按钮失效
        if(index == -1){
            index = 0;
            return;
        }
        changeImg(index, currentIndex);
    });


    $('.dot span').click(function(){
        index = Number($(this).attr('index'));

        if(currentIndex == index){
            return;
        }

        changeImg(index, currentIndex);
    });

    var timer = setInterval(function(){
        next('timer');
    },3000);

    $('.banner-container').hover(function(){
        clearInterval(timer);
    }, function(){
        timer = setInterval(function(){
            next('timer');
        },3000);
    })
})(jQuery)

