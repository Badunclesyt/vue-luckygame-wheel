export function Drawwheel(el, config) {
  this.config = config || {} // 配置
  this.config.width = config.width || 300 // 画布宽
  this.config.height = config.height || 300 // 画布高
  this.config.cx = config.cx || this.config.width / 2 // 转盘中心x位置,没有值默认为画布宽度一半
  this.config.cy = config.cy || this.config.height / 2 // 转盘中心y位置，没有值默认为画布高度一半
  this.config.r = config.r || 150 // 转盘半径，默认为150
  this.config.wheelbg = config.wheelbg || '#e92f2c' // 转盘背景图片 没有就默认背景颜色
  this.config.data = config.data || []
  this.config.textMaxWidth = config.textMaxWidth || 80
  this.config.textfont = config.textfont || 12
  this.config.textcolor = config.textfont || '#fc7f49'
  this.el = el
  this.el.width = config.width
  this.el.height = config.height
  // 创建转盘背景
  let img = onloadImg(this.config.wheelbg)
  let getCtx = this.el.getContext('2d')
  img.onload = () => {
    // 绘制奖品图片
    getCtx.drawImage(img, 0, 0)
    // 绘制奖品文字
    mapText(this.el, this.config)
  }
}

// 遍历奖品信息并绘制奖品图片
function mapText(el, config) {
  let data = config.data
  let len = data.length

  for (let i = 0; i < len; i++) {
    let img = []
    img[i] = onloadImg(config.data[i].icon)
    drowText(el, config, i)
    img[i].onload = () => {
      let getCtx = el.getContext('2d')
      getCtx.save()
      getCtx.beginPath()
      getCtx.translate(config.cx, config.cy)
      const x = Math.floor(Math.sin(d2a(i * 360 / 8 + 22.5)) * (config.r - 50))
      const y = Math.floor(Math.cos(d2a(i * 360 / 8 + 22.5)) * (config.r - 50))
      getCtx.translate(x, -y)
      getCtx.rotate(d2a(i * 45 + 22.5))
      getCtx.drawImage(img[i], -40, -25, 80, 40) // 图片宽高比最好为2/1
      getCtx.closePath()
      getCtx.restore()
    }
  }
}

// 绘制奖品信息
function drowText(el, config, i) {
  let getCtx = el.getContext('2d')
  getCtx.save()
  getCtx.beginPath()
  getCtx.textBaseline = 'top'
  getCtx.textAlign = 'center'
  getCtx.font = config.textfont + 'px a'
  getCtx.fillStyle = config.textfont
  getCtx.translate(config.cx, config.cy)
  const x = Math.floor(Math.sin(d2a(i * 360 / 8 + 22.5)) * (config.r - 50))
  const y = Math.floor(Math.cos(d2a(i * 360 / 8 + 22.5)) * (config.r - 50))
  getCtx.translate(x, -y)
  getCtx.rotate(d2a(i * 45 + 22.5))
  getCtx.fillText(config.data[i].name, 0, 30, [config.textMaxWidth])
  getCtx.closePath()
  getCtx.restore()
}

// 角度转弧度
function d2a(n) {
  return n * Math.PI / 180
}

// 创建img
function onloadImg(src) {
  let img = new Image()
  img.src = src
  return img
}
