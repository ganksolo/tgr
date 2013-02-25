void function($,win){
  var asynApi = {
    /**
     * [getStreamProduct  获取上下游产品名称]
     * @param  {[String]} keyword    [产品关键字]
     * @param  {[String]} type       [五大类(news,demand,supply...)]
     * @param  {[String]} streamType [上下游类型(up/down)]
     * @return {[Object]}            [defer(Deferred对象的实例)]
     */
    getStreamProduct : function(keyword, type, streamType, id){
        var defer = $.Deferred(),
            stream = (streamType == 'up') ? 'up' : 'down', 
            requestMethod = 'productUpDownNum',
            requestUrl =  '/news_api.php';
        var loading = $('#'+id).find('.streamLoading'),
            txt = (streamType == 'up') ? '上游资讯' : '下游资讯';
            $.getJSON('/api/', 
                {method : requestMethod,
                 key : keyword,
                 item : stream,
                 type : type,
                 is_ajax : 1
                }, function(data){
                    defer.resolve(data,stream);
            }).error(function(){
              loading.text( txt + '请求出错，请刷新页面！');
              loading.css('background','none');
            });
            return defer;
    },
    /**
     * [getStreamRelateNews 获取上下游每个产品的相关新闻]
     * @param  {[String]} id [上下游父元素ID属性]
     */
    getStreamRelateNews : function(id){
        var defer = $.Deferred(),wrap = $('#'+id),t = this;
        var sendRequest = function(method,key){
          return $.getJSON('/news_api.php', {method: method,keyword : key}, function(data){
                  defer.resolve(data);
          });
        };
        wrap.delegate('a.toggleRelateNews', 'click', function(e){
            e.preventDefault();
            var currentContext = $(this);
            var title = currentContext.prev().text();
            var parentEle = currentContext.closest('dt.srm-title');
            var dd = parentEle.next('dd.srm-extraInfo');
            if(parentEle.attr('isAjax') == 'false'){
                //能够发送请求时，加一个请求状态，防止用户连续点击
                if( parentEle.attr('ajaxStatus') == '0'){

                    //加载中ui提示
                    parentEle.append('<div class="newsLoading">加载中...</div>');  

                    parentEle.attr('ajaxStatus','1');
                    //发送请求
                    sendRequest('getProductNews',title)
                    .then(
                      function(data){
                        renderAsyn.stremaRelateNewsList(data, parentEle);
                      },function(){
                        alert('上下游产品相关资讯请求失败!');
                      }
                    );

                }
                
              } else {
                toggleStreamNews(currentContext, parentEle);
              }              
        });

        

    },
    /**
     * [getWeiboData 获取weibo的数据]
     * @return {[Object]} [defer(Deferred对象的实例)]
     */
    getWeiboData : function(){
        var defer = $.Deferred();
        return $.getJSON('/news_weibo_ajax.php',{topic : 'weibo'},function(data){
            defer.resolve(data);
        })
    },
    /**
     * [getFirstLocalNews 获取页面首次加载时的本地新闻]
     * @param  {[Number]} id  [代表不同行业的ID]
     * @param  {[Number]} ip  [客户端所在地区ip地址]
     * @param  {[Number]} num [请求数据的条数]
     * @return {[Object]} [defer(Deferred对象的实例)]
     */
    getFirstLocalNews : function(id, ip, num){
        var defer = $.Deferred(),ip = String(ip),noNews = $('.noNews'),loading = $('#J_localLoading');
        $.getJSON('/news_api.php', {method : 'getAreaData', id : id, area : ip, num : num}, function(data){
            defer.resolve(data, ip);
        }).error(function(){
            loading.addClass('hide');
            noNews.text(ip + '地区数据请求出错！').removeClass('hide');
        });
        $('.toggleCity').find('>a').text(ip);
        return defer;
    },
    /**
     * [getLocaNews 获取用户选择地区后的本地新闻]
     */
    getLocaNews : function(){
        var defer = $.Deferred(),
            city = $('#J_city'),
            hotNews = $('#J_hotLocaNews'),
            extraNews = $('#J_extraLocaNews'),
            loading = $('#J_localLoading'),
            requestUrl =  '/news_api.php';
        var noNews = $('.noNews'), noData = $('.noData');
        //每个异步用一个defer
        var sendRequest = function(method,area,id,num){
          return $.getJSON('/news_api.php', {method : method, area : area, id : id, num : num}, function(data){
                  defer.resolve(data);
          }).error(function(){
                noNews.empty();
                loading.addClass('hide');
                noNews.text(area + '地区数据请求出错！').removeClass('hide');
          });
        };  
        city.delegate('a', 'click', function(e){
            e.preventDefault();

            hotNews.empty();
            extraNews.empty();

            loading.removeClass('hide');
            //每次发送新的请求都隐藏没数据提示的UI界面
            noData.addClass('hide');

            var that = $(this), getCity = $.trim(that.text());

            var contains = that.parents('.other-city-box');
            var industryId = city.attr('data-industry');
            contains.addClass('hide');
            contains.prev('.toggleCity').find('>a').text(getCity);

            sendRequest('getAreaData', getCity, industryId, 16)
            .then(
                function(data){
                  renderAsyn.localNews(data, getCity);
                }
            );
        });
    }

  };

  win.asynApi = asynApi;

}(jQuery,window)

