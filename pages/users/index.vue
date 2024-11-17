<template>
  <view class="content">
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
            <button class="uni-button" size="mini" type="primary" @click="inputDialogToggle">修改</button>
            <button class="uni-button" size="mini" type="warn">删除</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>

    <view>
      <uni-popup ref="inputDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
<!--        <uni-popup-dialog ref="inputClose" mode="base" title="输入内容" @confirm="submit('valiForm')">-->
<!--        </uni-popup-dialog>-->
        <uni-section title="表单校验" type="line"/>
        <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
          <uni-forms-item label="姓名" required name="name">
            <uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required name="age">
            <uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
          </uni-forms-item>
          <uni-forms-item label="自我介绍" name="introduction">
            <uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入自我介绍" />
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit('valiForm')">提交</button>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getUserPage } from "@/api/infrastructure/users";
import UniTd from "../../uni_modules/uni-table/components/uni-td/uni-td.vue";
import UniTh from "../../uni_modules/uni-table/components/uni-th/uni-th.vue";
import UniTr from "../../uni_modules/uni-table/components/uni-tr/uni-tr.vue";
import UniTable from "../../uni_modules/uni-table/components/uni-table/uni-table.vue";

export default {
  components: {UniTable, UniTr, UniTh, UniTd},
  data() {
    return {
      users: [],
      value: '',
      // 校验表单数据
      valiFormData: {
        name: '',
        age: '',
        introduction: '',
      },
      // 校验规则
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: '年龄不能为空'
          }, {
            format: 'number',
            errorMessage: '年龄只能输入数字'
          }]
        }
      },
    }
  },
  onLoad() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      getUserPage().then(response => {
        this.users = response.data.list.sort((a, b) => a.id - b.id);
      });
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open()
    },
    submit(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        uni.showToast({
          title: `校验通过`
        })
        this.$refs.inputDialog.close()
      }).catch(err => {
        console.log('err', err);
      })
    },
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