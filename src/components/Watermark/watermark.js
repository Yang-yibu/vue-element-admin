/* eslint-disable */
// const CONTAINERID = '_avue_markcontainer';

import { randomId } from '@/utils/util';

const config = {
  text: '无敌大水印',
  font: '30px 黑体',
  canvasWidth: 500,
  canvasHeight: 200,
  textAlign: 'center',
  textStyle: 'rgba(100, 100, 100, 0.15)',
  degree: -20
};

class waterMark {
  constructor(opt = {}) {
    // containerId
    this.CONTAINERID = randomId();
    this.drawCanvas = this.drawCanvas.bind(this);
    this.parentObserver = this.parentObserver.bind(this);
    this.Repaint = this.Repaint.bind(this);
    this.isObserver = false;
    this.init(opt);
    this.drawCanvas();
    this.parentObserver();
  }

  init(opt) {
    this.option = {};
    this.option.text = opt.text || config.text;
    this.option.font = opt.font || config.font;
    this.option.canvasWidth = opt.canvasWidth || config.canvasWidth;
    this.option.canvasHeight = opt.canvasHeight || config.canvasHeight;
    this.option.textAlign = opt.textAlign || config.textAlign;
    this.option.textStyle = opt.textStyle || config.textStyle;
    this.option.degree = opt.degree || config.degree;
  }

  drawCanvas() {
    this.isObserver = true;
    let divContainer = document.createElement('div');
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    divContainer.id = this.CONTAINERID;

    canvas.width = this.option.canvasWidth;
    canvas.height = this.option.canvasHeight;
    context.font = this.option.font;
    context.textAlign = this.option.textAlign;
    context.fillStyle = this.option.textStyle;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(this.option.degree * Math.PI / 180);
    context.fillText(this.option.text, 0, 0);

    let backgroundUrl = canvas.toDataURL('image/png');
    this.styleStr = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:9999;
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${backgroundUrl}')`;
    divContainer.setAttribute('style', this.styleStr);
    document.body.appendChild(divContainer);
    this.wmObserver(divContainer);
    this.isObserver = false;
  }

  wmObserver(divContainer) {
    let wmConf = { attributes: true, childList: true, characterData: true };
    let wmObserver = new MutationObserver((mo) => {
      if (!this.isObserver) {
        let _obj = mo[0].target;
        _obj.setAttribute('style', this.styleStr);
        _obj.setAttribute('id', this.CONTAINERID);
        wmObserver.takeRecords();
      }
    });
    wmObserver.observe(divContainer, wmConf);
  }

  parentObserver() {
    let bodyObserver = new MutationObserver(() => {
      if (!this.isObserver) {
        let __wm = document.querySelector(`#${this.CONTAINERID}`);
        if (!__wm) {
          this.drawCanvas();
        } else if (__wm.getAttribute('style') !== this.styleStr) {
          __wm.setAttribute('style', this.styleStr);
        }
      }
    });
    bodyObserver.observe(document.querySelector(`#${this.CONTAINERID}`).parentNode, { childList: true });
  }

  Repaint(opt = {}) {
    this.isObserver = true;
    this.init(opt);
    let _wm = document.querySelector(`#${this.CONTAINERID}`);
    _wm.parentNode.removeChild(_wm);
    this.drawCanvas();
  }
}
export default waterMark;
