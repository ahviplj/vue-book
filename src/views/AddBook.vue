<template>
  <div>
    <el-form style="width: 60%" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
          prop="name"
          label="图书名称"
          :rules="[
      { required: true, message: '请输入图书名称', trigger: 'blur' },
      {min:3,max:10,message: '长度3-10个字符',trigger:'blur'}
    ]"
      >
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>

      <el-form-item
          prop="author"
          label="图书作者"
          :rules="[
      { required: true, message: '请输入图书作者', trigger: 'blur' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        name: '',
        author:''
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //发送post强求添加数据
          axios.post("http://localhost:8182/book/add",this.dynamicValidateForm).then(function (resp) {
            if(resp.data){
              _this.$alert(_this.dynamicValidateForm.name+'添加成功', '添加数据', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/bookManage")
                }
              });
            }else{
              this.$message('添加失败')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {


  }
}
</script>
