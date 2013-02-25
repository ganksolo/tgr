void function($,win){
  var renderAsyn = {
      /**
       * [streamProduct 渲染上下游产品名称]
       * @param  {[Object]} data   [服务器响应json数据]
       * @param  {[String]} stream [上游 or 下游]
       */
      streamProduct : function(data, stream){
            if(data.status == 1){
                var thisId = (stream == 'up') ? $('#upStreamNews') : $('#downStreamNews');
                var type = (stream == 'up') ? '上游' : '下游';
                var bar  = $('<h3 class="s-md-title">'+ type +'资讯</h3>');
                var contains = thisId.find('.s-r-md-list');
                bar.prependTo(thisId);
                var s = data.data,str = '';
                var loading = thisId.find('.streamLoading');
                for(var i=0; i < s.length; i++){
                    str += '<dl class="eachProWrap"><dt class="srm-title" isAjax="false" ajaxStatus="0"><a class="ep" href="'+s[i].url+'" title="'+s[i].name+'">'+setString(s[i].name, 20)+'</a><a href="" title="查看“'+s[i].name+'”相关新闻" class="toggleRelateNews"></a></dt></dl>';
                }
                loading.addClass('hide');
                $(str).appendTo(contains);

            }
      },
      /**
       * [stremaRelateNewsList 渲染上下游产品对应的相关新闻]
       * @param  {[Object]} result [服务器响应json数据]
       * @param  {[Object]} ele    [当前产品的元素]
       */
      stremaRelateNewsList : function(result, ele){
          var wrap = $('<dd class="srm-extraInfo"><span class="asyn-arrow"></span><ul></ul></dd>');
          var loading = ele.find('.newsLoading'), btnEle = ele.find('.toggleRelateNews');
          if(result.status == 1){ 
            var s = result.data, str = '';
            for(var i=0; i < s.length; i++){
                str += '<li><a href="'+s[i].url+'" title="'+s[i].title+'">'+setString(s[i].title, 28)+'</a></li>'; 
            }
            wrap.insertAfter(ele);
            ulWrap = ele.next().find('ul');
            loading.addClass('hide');
            $(str).appendTo(ulWrap);
            //数据渲染成功后，改变isAjax属性，确认只发一次请求。
            ele.attr('isAjax','true'); 
            btnEle.addClass('putAwray');
            btnEle.attr('title','收起来');
          }
      },
      /**
       * [weibo 渲染微博的数据]
       * @param  {[Object]} data [服务器响应的json数据]
       */
      weibo : function(data){
            var wb = $('#J_wb');
            $.each(data, function(i,n){ 
                url = (n.home_page == undefined) ? n.source_url : n.home_page;
            var li = $('<li><dl class="each-weibo"><dt><a href="'+ url +'" target="_blank" title="'+ n.user_name +'"><img src="'+ n.user_image +'"   alt="'+ n.user_image +'"/></a></dt><dd class="wb-contains"><a title="'+ n.user_name +'" target="_blank" href="'+ url +'">'+ n.user_name +'</a>：'+ n.content +'<div class="web-time">'+ n.publish_time +'</div></dd></dl></li>');
                li.appendTo(wb);
            });
      },
      /**
       * [handleResponseData 渲染本地新闻列表]
       * @param  {[Object]} result [服务器响应的json数据]
       */
      localNews : function(result, ip){
          var hotNews = $('#J_hotLocaNews'),extraNews = $('#J_extraLocaNews'),loading = $('#J_localLoading'),j=0;
          var noNews = $('.noNews'), noData = $('.noData');
          loading.addClass('hide');
          if(result.status == 1){
            $.each(result.data,function(i,data){
                if(j < 8){
                    var str = $("<li><a href='"+data.url+"' title='"+data.title+"'>"+ setString(data.title,40) +"</a><time datetime='"+data.time+"'>"+data.time+"</time></li>");
                    str.appendTo(hotNews);
                }else{
                    var str = $("<li><a href='"+data.url+"' title='"+data.title+"'>"+ setString(data.title,28) +"</a><time datetime='"+data.time+"'>"+data.time+"</time></li>");
                    str.appendTo(extraNews);
                }
                j++;
                
            });
          }else{
            noData.text('抱歉，暂无“'+ip+'”相关新闻!');
            noData.removeClass('hide');
          }
          
      }
  };

  win.renderAsyn = renderAsyn;

}(jQuery,window)

