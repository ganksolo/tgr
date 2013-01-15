var SearchInput = {

    //options
    settings : {
        sForm : $('#J_searchForm'),
        typeList :  $('#J_typeList'),
        curType : $('#J_currentType'),
        typeData : {
            demand : 'demand',
            supply : 'supply',
            dict : 'dict',
            news : 'news',
            company : 'company'
        },
        searchFormAction : SEARCH_FORM_URLS,
        host : host = location.protocol + '//' + location.host
    },

    /**
     * [init shortcut and initialization method]
     * @return {[type]} [description]
     */
    init : function(){
        var s = this.settings;
        this.setFormUrl(s);
        this.displayLayer(s);
    },
    /**
     * [setFormUrl 根据不同类型的栏目设置搜索表单的url]
     * @param  {[obj]}  options [ 数据集合的对象 ]
     */
    setFormUrl : function(options){
        var typeList = options.typeList,
            typeData = options.typeData,
            sForm = options.sForm;

        typeList.on('click', 'a', function(e){
            e.preventDefault();
            var _this = $(this),
                _thisText = _this.text(),
                _thisType = _this.attr('data-type'),
                _getCurText = currentVal.text(), 
                _getCurType = currentVal.attr('data-type');

            currentVal.text(_thisText).attr('data-type', _thisType);
            _this.text( _getCurText).attr('data-type', _getCurType);

            // 根据不同搜索类型，设置不同的action
            switch(_thisType){
                case typeData.supply :
                    var val = searchFormAction.supply;
                    sForm.attr('action', host + val);
                    break;
                case typeData.demand :
                    var val = searchFormAction.demand;
                    sForm.attr('action', host + val);
                    break;
                case typeData.company :
                    var val = searchFormAction.company;
                    sForm.attr('action', host + val);
                    break;
                case typeData.dict :
                    var val = searchFormAction.dict;
                    sForm.attr('action', host + val);
                    break;
                case typeData.news :
                    var val = searchFormAction.news;
                    sForm.attr('action', host + val);
                    break;

                default:
                    alert("无法匹配到当前搜索类型！");
            }
            typeList.hide();
        });
    },
    /**
     * [displayLayer 搜索类型选择层的显示和影藏效果]
     * @param  {[obj]}  options [ 数据集合的对象 ]
     * @return {[type]}         [description]
     */
    displayLayer : function(options){
        var curType = options.curType;
        curType.hover(function(){
            typeList.show();
        }, function(){
            typeList.hide();
        });
    }
};
