<template>
<div class="Sudoku">
  <div class="list-wrap">
    <div ref="changeItem"  class="list-item" v-for="(prize,index) in prizeData" :key="index" :class="index=== value ?'active':''">
      <div class="img-wrap">
        <img class="prize-img" v-if="prize.icon" :src="prize.icon">
      </div>
      <div class="prize-name">
          {{prize.name}}
      </div>
    </div>
    <div class="btn" @click="begin">
    </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'Sudoku',
  data() {
    return {
      prizeData: [
        {name: '0等奖', icon: require('../../assets/image/one.png')},
        {name: '1等奖', icon: require('../../assets/image/two.png')},
        {name: '2等奖', icon: require('../../assets/image/three.png')},
        {name: '3等奖', icon: require('../../assets/image/four.png')},
        {name: '4等奖', icon: require('../../assets/image/one.png')},
        {name: '5等奖', icon: require('../../assets/image/two.png')},
        {name: '6等奖', icon: require('../../assets/image/three.png')},
        {name: '7等奖', icon: require('../../assets/image/four.png')}
      ], // 奖品列表
      prize: '', // 中奖位置
      value: -1,
      count: 8, // 总共有多少个位置
      speed: 300, // 初始转动速度
      cycle: 80, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      timer: 0, // 每次转动定时器
      times: 0, // 转动次数
      ready: true
    }
  },
  methods: {
    begin() {
      if (!this.ready) return
      this.ready = false
      this.prize = this.getRandom()
      console.log(this.prize, this.prizeData[this.prize])
      this.startPosite()
    },
    // 计算中奖下标
    startPosite() {
      // 计算第一次中奖的下标
      if (this.value === -1) {
        this.cycle = this.cycle + this.prize
      } else if (this.value === 0) {
        // 计算至少第二次中奖的下标
        this.cycle = this.cycle - 1 + this.prize
      } else {
        this.cycle = this.cycle - 1 + (this.count - this.value) + this.prize
      }
      this.startRoll()
    },
    // 开始转动
    startRoll() {
      this.times++ // 转动次数
      this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      if (this.times > this.cycle) {
        // 清除转动定时器，停止转动 并且 初始化各个选项为下次点击做准备
        clearTimeout(this.timer)
        this.speed = 300
        this.times = 0
        this.cycle = 80
        // 结束后延时发送弹框请求
        setTimeout(() => {
          this.ready = true
        }, 1000)
      } else {
        if (this.times <= 5) {
          // 加速
          this.speed -= 55
        } else if (this.times > 5 && this.times <= this.cycle / 10 * 9) {
          // 加速
          this.speed = this.speed
        } else if (this.times > this.cycle / 10 * 9 && this.times <= this.cycle - 2) {
          // 减速
          this.speed += 50
        } else {
          // 减速
          this.speed += 10
        }
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },
    // 转动时候发生变化的控制
    oneRoll() {
      this.value++
      if (this.value > this.count - 1) {
        this.value = 0
      }
    },
    // 模拟中奖的位置信息
    getRandom() {
      return Math.floor(Math.random() * 9)
    }
  }
}
</script>
<style lang="scss" scoped>
$sudokuWidth: 300px;
$itemWidth: 100px;
.Sudoku{
  width: $sudokuWidth;
  margin: 0 auto;
  .list-wrap {
    position: relative;
    box-sizing: border-box;
    width: $sudokuWidth;
    height: $sudokuWidth;
    margin: 0 auto;
    .btn{
      position: absolute;
      box-sizing: border-box;
      width: $itemWidth;
      height: $itemWidth;
      top: $itemWidth;
      left: $itemWidth;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 700;
      line-height: $itemWidth;
      text-align: center;
      background: url("../../assets/image/btn-begin.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .list-item{
      position: absolute;
      box-sizing: border-box;
      width: $itemWidth;
      height: $itemWidth;
      border-radius: 5px;
      text-align: center;
      /*background: url("../../assets/image/btn-bg.jpg") no-repeat;*/
      /*background-size: 100% 100%;*/
      background-color: #25a4bb;
      .img-wrap{
        width: 100%;
        overflow: hidden;
        img{
          width: 100%;
          vertical-align: top;
        }
      }
      .prize-name{
        color: #fc7f49;
        font-size: 13px;
      }
      &:first-child{
      top:0;
      left: 0;
      }
      &:nth-child(2){
      top: 0;
      left: $itemWidth;
      }
      &:nth-child(3){
      top:0;
      right: 0;
      }
      &:nth-child(4){
      top: $itemWidth;
      right: 0;
      }
      &:nth-child(5){
      bottom: 0;
      right: 0;
      }
      &:nth-child(6){
      bottom: 0;
      left:$itemWidth;
      }
      &:nth-child(7){
      bottom: 0;
      left: 0;
      }
      &:nth-child(8){
      top:$itemWidth;
      left: 0;
      }
    }
    .active{
      opacity: .5;
    }
  }
}
</style>
