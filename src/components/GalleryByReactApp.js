var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

// 获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = 'http://7o50ww.com1.z0.glb.clouddn.com/reactdemo/' + singleImageData.filename;

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

/*
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/*
 获取 0道30任意正负
 */

function get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
}
//图片组件
var ImgFigure = React.createClass({

    //点击处理函数
    handleClick: function (e) {

        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },

    render: function () {

        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.rotate){
            var that = this;
            ['-moz-', '-ms-', '-webkit-', ''].forEach(function (value) {
                styleObj.transform = value + 'rotate(' + that.props.arrange.rotate + 'deg)';
            });
        }

        var imgFigureClassName = 'img-figure';
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} onClick={this.handleClick}/>

                <figcaption>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>

            </figure>
        );
    }
});

var ControllerUnit = React.createClass({
    handleClick: function(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    },
    render: function(){

        var contorllerUnitsClassName = 'controller-unit';
        if(this.props.arrange.isCenter){
            contorllerUnitsClassName = 'controller-unit is-center';
            if(this.props.arrange.isInverse){
                contorllerUnitsClassName = 'controller-unit is-center is-inverse';
            }
        }
        return (
            <span className={contorllerUnitsClassName} onClick={this.handleClick}></span> );
    }
});
// 图片区组件
var GalleryByReactApp = React.createClass({

    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: { //水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {//垂直方向取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    },

    //翻转图片  输入当前被执行翻转 操作的图片 index

    inverse: function(index){
      return function(){
          var imgsArrangeArr = this.state.imgsArrangeArr;

          imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
          this.setState({
            imgsArrangeArr: imgsArrangeArr
          });
      }.bind(this);
    },


    /*
     重新布局所有图片
     指定居中某个图片
     */

    rearrange: function (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerpos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);


        //首选居中 centerIndex图片
        imgsArrangeCenterArr[0].pos = centerpos;
        //居中图片不旋转
        imgsArrangeCenterArr[0].rotate = 0;
        imgsArrangeCenterArr[0].isCenter = true;
        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random(imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        //布局图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },

                rotate: get30DegRandom(),
                isInverse: false,
                isCenter: false

            };
        });

        //布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;
            //前半部分布局左边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;


            } else {
                //后半部分 布局右边
                hPosRangeLORX = hPosRangeRightSecX;

            }


            imgsArrangeArr[i].pos = {
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            };

            imgsArrangeArr[i].rotate = get30DegRandom();
            imgsArrangeArr[i].isCenter = false;
        }

        if (imgsArrangeArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    },
    /**
     * 利用rearRange函数 居中对应index图片
     *
     */
    center: function (index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    },
    //初始化状态
    getInitialState: function () {
        return {
            imgsArrangeArr: []
        };
    },

//组件加载完之后  为每张图片计算其位置范围
    componentDidMount: function () {
        //首先拿到舞台的大小  scollwidth 对象实际宽度不算滚动条   clientwidth  可视区宽度   offsetwidth是实际宽度  要算滚动条
        var stageDOM = React.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到一个imageFigure的大小
        var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };


        //取值范围
        //计算左侧右侧 区域图片排布取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算上侧 区域图片排布取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);


    },


    render: function () {
        var controllerUnits = [],
            imageFigures = [];


        imageDatas.forEach(function (value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },

                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                };
            }
            imageFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}
                                         arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
            //传递状态信息
            controllerUnits.push(< ControllerUnit arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);


        }.bind(this));

        return (
            <section className='stage' ref='stage'>
                <section className='img-sec'>
                    {imageFigures}
                </section>
                <nav className='controller-nav'>
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});


React.render(<GalleryByReactApp/>, document.getElementById('content'));
module.exports = GalleryByReactApp;
