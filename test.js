function weiboHandler(){
    var wbID = document.getElementById('J_weibo');
    if(!wbID) return;
    /**
     * [getWeiboData 获取weibo的数据]
     * @return {[Object]} [defer(Deferred对象的实例)]
     */
    var getWeiboData = function(){
        var defer = $.Deferred();
        return $.getJSON('/news_weibo_ajax.php',{topic : 'weibo'},function(data){
            defer.resolve(data);
        })
    };
    /**
     * [weibo 渲染微博的数据]
     * @param  {[Object]} data [服务器响应的json数据]
     */
    var weibo = function(data){
            var wb = $('#J_weibo');
            $.each(data, function(i,n){ 
                url = (n.home_page == undefined) ? n.source_url : n.home_page;
            var li = $('<li><dl><dt><a href="'+ url +'" target="_blank" title="'+ n.user_name +'">'+ n.user_name +'</a><span>'+ n.publish_time +'</span></dt><dd>'+ n.content +'</dd></dl></li>');
                li.appendTo(wb);
            });
    };
    getWeiboData().then(
        function(data){
           renderAsyn.weibo(data); 
        },
        function(){
            alert('微博数据异步请求延迟失败！');
        }
    ) 
}
