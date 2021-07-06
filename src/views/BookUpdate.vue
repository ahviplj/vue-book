<template>
  <div>
    <el-form style="width: 60%" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
          prop="id"
          label="图书编号"

      >
        <el-input v-model="dynamicValidateForm.id" readonly></el-input>
      </el-form-item>
        <el-form-item
          prop="name"
          label="图书名称"

      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>

      <el-form-item
          prop="author"
          label="图书作者"

      >
        <el-input v-model="dynamicValidateForm.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEditForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="recoveryForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        id:'',
        name: '',
        author:''
      }
    };
  },
  methods: {
    submitEditForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //发送post强求修改数据
          axios.put("http://localhost:8182/book/update",this.dynamicValidateForm).then(function (resp) {
            if(resp.data == "success"){
              _this.$alert(_this.dynamicValidateForm.name+'修改成功', '修改数据', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/bookManage")
                }
              });
            }else{
              this.$message('修改失败')
            }
          })



        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    recoveryForm(formName) {
      let id = this.$route.query.id;
      let this_ = this;
      axios.get('http://localhost:8182/book/all/'+id).then(function (response) {
        console.log(response)

        this_.dynamicValidateForm = response.data;
      })
      // this.$refs[formName].resetFields();
    }
  },
  created() {

    let id = this.$route.query.id;
    let this_ = this;
    axios.get('http://localhost:8182/book/all/'+id).then(function (response) {
      console.log(response)

      this_.dynamicValidateForm = response.data;
    })

  }
}
</script>


