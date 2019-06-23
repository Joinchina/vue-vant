<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  max-width: 600px;/*no*/
  margin: 0 auto;
}
#app {
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  font-family:PingFang-SC-Bold;
  
}
img{ 
    pointer-events: none;
    vertical-align: sub;
  }
</style>
