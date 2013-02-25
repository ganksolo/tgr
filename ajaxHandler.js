/**
 * [openStream 为开发提供的上下游产品的对外接口]
 * @param  {[String]} keyword    [产品关键字]
 * @param  {[String]} type       [五大类(news,demand,supply...)]
 * @param  {[String]} streamType [上下游类型(up/down)]
 * @param  {[String]} streamID   [ID(upStreamNews/downStreamNews)]
 */
var openStream = function(keyword, type, streamType, id){
    asynApi.getStreamProduct(keyword, type, streamType, id).then(
        function(data,stream){
            renderAsyn.streamProduct(data,stream);
        },
        function(){
            alert('上下游产品异步延迟失败！');
        }
    );
};
/**
 * [openLocalNews 为开发提供的本地新闻的对外接口]
 * @param  {[Number]} id  [代表不同行业的ID]
 * @param  {[Number]} ip  [客户端所在地区ip地址]
 * @param  {[Number]} num [请求数据的条数]
 */
var openLocalNews = function(id, ip, num){
    asynApi.getFirstLocalNews(id, ip, num).then(function(data, ip){
        renderAsyn.localNews(data, ip);
    },function(){
        alert('本地新闻异步请求延迟失败！');
    });

}
/**
 * [asynEmitter 异步函数的调用]
 * @return {[type]} [description]
 */
var asynEmitter = function(){
    asynApi.getStreamRelateNews('upStreamNews');
    asynApi.getStreamRelateNews('downStreamNews');
    if($('#pageMain').attr('data-page') == 'INDEX'){
      asynApi.getWeiboData().then(
            function(data){
               renderAsyn.weibo(data); 
            },
            function(){
                alert('微博数据异步请求延迟失败！');
            }
        )  
    }
    asynApi.getLocaNews();
};
