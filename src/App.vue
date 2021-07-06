<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eeeeee">
      <!--      el-container 构建整个页面框架，el-aside构建左侧菜单，el-menu构建左侧菜单内容-->
      <!--      :default-openeds  默认打开菜单  :default-active="['1-1']" 默认选中的菜单，通过菜单的index值来关联 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['0', '1']">
          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show" >
            <template slot="title"><i class="el-icon-message"></i>{{ item.name }}</template>
            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :class="$route.path==item2.path?'is-active':''">{{ item2.name }}
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>

    </el-container>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Table from "../views/Table.vue";
export default {
  name: 'app',
  components: {
    // HelloWorld
    // Table
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }

}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
