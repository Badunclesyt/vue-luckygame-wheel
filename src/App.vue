<template>
  <div id="app">
    <wheel/>
    <Sudoku/>
  </div>
</template>

<script>
import wheel from '@/components/wheel'
import Sudoku from '@/components/Sudoku'

export default {
  name: 'App',
  components: {
    wheel,
    Sudoku
  },
  methods: {
  }
}
</script>

<style>

</style>
