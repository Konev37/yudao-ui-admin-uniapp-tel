<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="rolePageVO">
<!--        <uni-forms-item label="ID" name="id">-->
<!--          <uni-easyinput v-model="rolePageVO.id" placeholder="请输入ID" />-->
<!--        </uni-forms-item>-->
        <uni-forms-item label="名称" name="name">
          <uni-easyinput v-model="rolePageVO.name" placeholder="请输入名称" />
        </uni-forms-item>
      </uni-forms>
      <button type="default" size="mini" @click="getRoles(rolePageVO)">查询</button>
<!--      <button type="primary" size="mini" @click="popUpdateDialog({}, 'create')">新增</button>-->
    </view>
    <uni-table :data="roles" border stripe>
      <uni-tr>
        <uni-th width="30px" align="center">角色编号</uni-th>
        <uni-th width="30px" align="center">角色名称</uni-th>
<!--        <uni-th width="30px" align="center">设置</uni-th>-->
      </uni-tr>
      <uni-tr v-for="role in roles" :key="role.id">
        <uni-td align="center">{{ role.id }}</uni-td>
        <uni-td align="center">{{ role.name }}</uni-td>
<!--        <uni-td>-->
<!--          <view class="uni-group">-->
<!--            <button class="uni-button size="mini" type="primary" @click="popUpdateDialog(role, 'update')">修改</button>-->
<!--            <button class="uni-button size="mini" type="warn" @click="deleteRole(role.id)">删除</button>-->
<!--          </view>-->
<!--        </uni-td>-->
      </uni-tr>
    </uni-table>
  </view>
</template>
<script>
import { getRolePage } from '@/api/infrastructure/roles'
import UniTh from "../../uni_modules/uni-table/components/uni-th/uni-th.vue";

export default {
  components: {UniTh},
  data() {
    return {
      roles: [],
      rolePageVO: {
        pageNo: 1,
        name: '',
        code: '',
      }
    }
  },
  onLoad() {
    this.getRoles()
  },
  methods: {
    getRoles(rolePageVO) {
      getRolePage(rolePageVO).then(res => {
        this.roles = res.data.list.sort((a, b) => a.id - b.id)
      })
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
