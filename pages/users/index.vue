<template>
  <view class="content">
    <uni-table :data="users" border stripe>
      <uni-tr>
        <uni-th align="center">ID</uni-th>
        <uni-th align="center">用户名</uni-th>
        <uni-th align="center">区域</uni-th>
        <uni-th align="center">设置</uni-th>
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
      <text>{{value}}</text>
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" value="对话框预置提示内容!"
                          placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getUserPage } from "@/api/infrastructure/users";

export default {
  data() {
    return {
      users: [],
      value: ''
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
    dialogInputConfirm(val) {
      this.value = val
      this.$refs.inputDialog.close()
    },
  }
}
</script>

<style>
.user-list {
  margin-top: 20px;
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.uni-group {
  display: flex;
  align-items: center;
}
</style>