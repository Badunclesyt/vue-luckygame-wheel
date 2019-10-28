<template>
  <div class="wheel" id="wheel">
    <div class="main-container">
      <div class="wheel-pointer" @click="handleotate()">
        <img src="../../assets/image/btnyuan.png" alt="">
      </div>
      <div class="wheel-container" :style="{transform:rotateAngle,transition:rotateTransition}">
        <canvas ref="newCanvas"/>
      </div>
    </div>
  </div>

</template>

<script>
import { Drawwheel } from '@/utils/createWheel'

export default{
  name: 'wheel',
  data() {
    return {
      ready: true,
      rotateAngle: '', // 将要旋转的角度
      rotateTransition: '', // 初始化选中的过度属性控制
      config: {
        width: null,
        height: null,
        wheelbg: null,
        pointerBg: null,
        data: []
      }
    }
  },
  mounted() {
    this.initPrize()
  },
  methods: {
    initPrize() {
      this.config = {
        width: 300,
        height: 300,
        wheelbg: require('../../assets/image/wheelbg.png'),
        pointerBg: require('../../assets/image/btnyuan.png'),
        data: [
          {name: '0等奖', icon: require('../../assets/image/one.png')},
          {name: '1等奖', icon: require('../../assets/image/two.png')},
          {name: '2等奖', icon: require('../../assets/image/three.png')},
          {name: '3等奖', icon: require('../../assets/image/four.png')},
          {name: '4等奖', icon: require('../../assets/image/one.png')},
          {name: '5等奖', icon: require('../../assets/image/two.png')},
          {name: '6等奖', icon: require('../../assets/image/three.png')},
          {name: '7等奖', icon: require('../../assets/image/four.png')}
        ]
      }
      console.log(this.$refs.newCanvas)
      new Drawwheel(this.$refs.newCanvas, this.config)
    },
    handleotate() {
      this.rotating()
    },
    // 模拟中奖的位置信息
    getRandom() {
      return Math.floor(Math.random() * 9)
    },
    rotating() {
      if (!this.ready) return
      this.ready = false // 旋转结束前，不允许再次触发
      const duringTime = 4 // 默认为4s
      const resultAngle = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5] // 最终会旋转的度数
      let index = this.getRandom()
      resultAngle.reverse()
      console.log(index, resultAngle)
      let rotateNumber = resultAngle[`${index}`] + 360 * 6
      this.rotateTransition = `transform ${duringTime}s ease-in-out` // 初始化选中的过度属性控制
      this.rotateAngle = `rotate(${rotateNumber}deg)`
      setTimeout(() => {
        this.rotateTransition = '' // 初始化过度样式
        this.rotateAngle = 'rotate(0deg)'// 初始化过旋转角度
        this.rotateAngle = `rotate(${rotateNumber - 6 * 360}deg)` // 恢复到其本身需要到达的位置
        this.ready = true
      }, 1000 * duringTime + 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    .wheel-pointer {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 50%;
      left: 50%;
      margin-left: -50px;
      margin-top: -60px;
      overflow: hidden;
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        }
      }
  }
</style>
