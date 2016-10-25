
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

var ImgFigure = React.createClass({
    render: function () {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>

            </figure>
        );
    }
});


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
//组件加载完之后  为每张图片计算其位置范围
    componentDidMount:function(){

    }



     render: function () {
         var controllerUnits = [],
             imageFigures = [];

         imageDatas.forEach(function(value){
            imageFigures.push(<ImgFigure data={value}/>);
         });

        return (
            <section className="stage">
                <section className="img-sec">
                    {imageFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});





React.render(<GalleryByReactApp/>, document.getElementById('content'));
module.exports = GalleryByReactApp;
