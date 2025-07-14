<template>
  <div class="manage">
    <el-button type="primary" @click="dialogVisible = true">+ 新 增</el-button>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="admin_id"
        label="用户Id"
        width="200">
      </el-table-column>
      <el-table-column
        prop="admin_password"
        label="用户密码"
        width="200">
      </el-table-column>
      <el-table-column
        prop="admin_name"
        label="用户姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="admin_role"
        label="用户角色"
        width="200">
      </el-table-column>
      <el-table-column
        prop="creat_time"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间">
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false">

      <!-- 录入表单信息 -->
      <el-form :rules="rules" ref="form" :model="form" label-width="auto">

        <el-form-item label="用户姓名" prop="admin_name">
          <el-input placeholder="请输入姓名" v-model="form.admin_name"></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="admin_password">
          <el-input 
            placeholder="不填则默认为123456" 
            v-model="form.admin_password"
            show-password
            clearable
            @change="handlePasswordChange">
          </el-input>
          <div v-if="showPasswordTip" class="password-tip">密码将被设置为默认值: 123456</div>
        </el-form-item>

        <el-form-item label="用户角色" prop="admin_role">
          <el-radio-group v-model="form.admin_role" @change="handleRoleChange">
            <el-radio label="1">普通用户</el-radio>
            <el-radio label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, getUserList} from '../api/index'; // 引入添加用户的API
export default {
  data() {
    return {
      dialogVisible: false,
      showPasswordTip: false,
      form: {
        admin_password: '',
        admin_name: '',
        admin_role: '1',
      },
      rules: {
        admin_name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        admin_role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ]
      },
      tableData:[]
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm('确定要关闭对话框吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetForm();
        done();
      }).catch(() => {});
    },
    
    handleCancel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    
    // 处理密码变更
    handlePasswordChange(value) {
      this.showPasswordTip = value === '';
    },
    
    // 处理角色选择变化
    handleRoleChange() {
      // 触发角色验证
      this.$refs.form.validateField('admin_role');
    },
    
    // 重置表单
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.showPasswordTip = false;
      this.form.admin_role = '1';
    },
    
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate(valid => {
        console.log(valid,'valid')

        if (valid) {
          // 处理密码默认值
          if (!this.form.admin_password) {
            this.form.admin_password = '123456';
            this.$message({
              message: '密码已设置为默认值: 123456',
              type: 'warning',
              duration: 2000
            });
          }
          
          // 准备发送给后端的数据
          const formData = {
            ...this.form,
            admin_role: parseInt(this.form.admin_role) // 转换为数字
          };
          
          console.log('提交的数据:', formData);

        addUser(formData).then(res => {
          console.log("完整响应:", res); // 保留日志便于调试
          
          // 修正点1：使用 resultCode 代替 code
          // 修正点2：通过 res.data 访问业务数据
          if (res.data.resultCode === 0) { 
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.resetForm();
          } else {
            this.$message.error(res.data.resultMsg || '操作失败'); 
          }
        }).catch(error => {
          this.$message.error('请求失败: ' + error.message);
        });
            } else {
          this.$message.error('请填写必填字段');
          return false;
        }

        //   //模拟成功提交
        //   this.$message.success('表单验证通过，数据已准备好提交');
        //   this.dialogVisible = false;
        //   this.resetForm();
        // } else {
        //   this.$message.error('请填写必填字段');
        //   return false;
      //   }
      });
    }
    
  }
}
</script>

<style scoped>
.password-tip {
  color: #e6a23c;
  font-size: 12px;
  margin-top: 5px;
}

/* 修复 aria-hidden 警告的样式 */
:deep(.el-radio-group) .el-radio__original {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  z-index: -1;
}
</style>