<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="userPageVO">
        <uni-forms-item label="ID" name="id">
          <uni-easyinput v-model="userPageVO.id" placeholder="请输入ID" />
        </uni-forms-item>
        <uni-forms-item label="用户名" name="username">
          <uni-easyinput v-model="userPageVO.username" placeholder="请输入用户名" />
        </uni-forms-item>
      </uni-forms>
      <button type="default" size="mini" @click="getUsers(userPageVO)">查询</button>
      <button type="primary" size="mini" @click="popDialog({}, 'create')">新增</button>
    </view>
    <uni-table :data="users" border stripe>
      <uni-tr>
        <uni-th width="20px" align="center">ID</uni-th>
        <uni-th width="30px" align="center">用户名</uni-th>
        <uni-th width="30px" align="center">区域</uni-th>
        <uni-th width="30px" align="center">设置</uni-th>
      </uni-tr>
      <uni-tr v-for="user in users" :key="user.id">
        <uni-td align="center">{{ user.id }}</uni-td>
        <uni-td align="center">{{ user.username }}</uni-td>
        <uni-td align="center">{{ user.deptName }}</uni-td>
        <uni-td>
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary" @click="popDialog(user, 'update')">修改</button>
            <button class="uni-button" size="mini" type="warn" @click="deleteUser(user.id)">删除</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
    <view>
      <uni-popup ref="updateDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="修改用户信息" type="line"/>
        <uni-forms ref="updateForm" :rules="rules" :modelValue="userSaveVO">
          <uni-forms-item label="姓名" required name="username">
            <uni-easyinput v-model="userSaveVO.username" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="区域" required name="area">
            <uni-data-select
                v-model="userSaveVO.deptId"
                :localdata="areaRange"
                @change="change"
            ></uni-data-select>
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="updateUser('updateForm')">提交</button>
      </uni-popup>
    </view>
    <view>
      <uni-popup ref="createDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="新增用户信息" type="line"/>
        <uni-forms ref="createForm" :rules="rules" :modelValue="userSaveVO">
          <uni-forms-item label="姓名" required name="username">
            <uni-easyinput v-model="userSaveVO.username" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="密码" required name="password">
            <uni-easyinput v-model="userSaveVO.password" placeholder="请输入密码" />
          </uni-forms-item>
          <uni-forms-item label="区域" required name="area">
            <uni-data-select
                v-model="userSaveVO.deptId"
                :localdata="areaRange"
                @change="change"
            ></uni-data-select>
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="createUser('createForm')">提交</button>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getUserPage, updateUser, createUser, deleteUser } from "@/api/infrastructure/users";
import { getSimpleDeptList } from "@/api/infrastructure/area";
import { getSimpleRoleList } from "@/api/infrastructure/roles";
import UniTd from "../../uni_modules/uni-table/components/uni-td/uni-td.vue";
import UniTh from "../../uni_modules/uni-table/components/uni-th/uni-th.vue";
import UniTr from "../../uni_modules/uni-table/components/uni-tr/uni-tr.vue";
import UniTable from "../../uni_modules/uni-table/components/uni-table/uni-table.vue";

export default {
  components: {UniTable, UniTr, UniTh, UniTd},
  data() {
    return {
      users: [],
      areas: [],
      userPageVO: {
        pageNo: 1,
        id: '',
        username: '',
      },
      // 校验表单数据
      userSaveVO: {
        id: '',
        username: '',
        nickname: '',
        remark: '',
        deptId: '',
        postIds: [],
        email: '',
        mobile: '',
        password: '',
      },
      // 区域数据
      areaRange: [],
      // 校验规则
      rules: {
        username: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          }]
        },
        deptId: {
          rules: [{
            required: true,
            errorMessage: '区域不能为空'
          }]
        }
      },
    }
  },
  onLoad() {
    this.getUsers();
    this.getAreas();
  },
  methods: {
    getUsers(userPageVO) {
      getUserPage(userPageVO).then(response => {
        this.users = response.data.list.sort((a, b) => a.id - b.id);
      });
    },
    getAreas() {
      getSimpleDeptList().then(response => {
        this.areas = response.data.sort((a, b) => a.id - b.id);
        this.areaRange = this.areas.map(area => ({
          value: area.id,
          text: area.name
        }));
      });
    },
    popDialog(user, type) {
      this.userSaveVO.id = user.id;
      this.userSaveVO.username = user.username;
      this.userSaveVO.deptId = user.deptId;
      this.userSaveVO.password = user.password;
      if (type === 'update') {
        this.$refs.updateDialog.open();
      } else if (type === 'create') {
        this.$refs.createDialog.open();
      }
    },
    updateUser(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `修改成功`
        // })
        this.$refs.updateDialog.close()
        updateUser(this.userSaveVO).then(response => {
          this.$modal.msgSuccess("修改成功")
          this.getUsers(this.userPageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
      })
    },
    createUser(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `新增成功`
        // })
        this.$refs.createDialog.close()
        createUser(this.userSaveVO).then(response => {
          this.$modal.msgSuccess("新增成功")
          this.getUsers(this.userPageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
      })
    },
    change(e) {
      console.log("e:", e);
    },
    deleteUser(id) {
      // console.log("user:", id);
      // 再次确认
      uni.showModal({
        title: '提示',
        content: '是否删除该用户？',
        success: (res) => {
          if (res.confirm) {
            // uni.showToast({
            //   title: `删除成功`
            // })
            deleteUser(id).then(response => {
              this.$modal.msgSuccess("删除成功")
              this.getUsers(this.userPageVO); // 刷新表格数据
            });
          }
        }
      });
    }
  }
}
</script>

<style>
.uni-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 允许元素换行 */
}
</style>