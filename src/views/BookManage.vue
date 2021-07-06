<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="图书ID"
          width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="姓名"
          width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>作者: {{ scope.row.author }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          label="作者"
          width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.author }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleAdd(scope.$index, scope.row)">新增</el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        align="left"
        background
        :page-size="6"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:null,
      tableData: null
    }
  },
  methods: {
    handleAdd(index, row) {
      this.$router.push("/addBook")
    },
    handleEdit(index, row) {
      // row.id;
      this.$router.push({
        path:'/bookUpdate',
        query:{
          id:row.id
        }
      });
    },
    handleDelete(index, row) {


      let _this = this;
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:8182/book/delete/"+row.id).then(function () {
          _this.$alert(row.name+'删除成功', '删除数据', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload();
            }
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    handleCurrentChange(index) {
      let this_ = this;
      axios.get('http://localhost:8182/book/all/'+index+'/6').then(function (response) {

        this_.tableData = response.data.content;
        this_.total = response.data.totalElements;

      })
    }
  },
  created() {
    let this_ = this;
    axios.get("http://localhost:8182/book/all/1/6").then(function (response) {

      this_.tableData = response.data.content;
      this_.total = response.data.totalElements;

    })
  }
}
</script>
