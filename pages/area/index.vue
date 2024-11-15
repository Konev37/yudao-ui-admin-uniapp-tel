<template>
  <view class="content">
    <uni-table :data="areas" border stripe>
      <uni-tr>
        <uni-th align="center">ID</uni-th>
        <uni-th align="center">区域名</uni-th>
        <uni-th align="center">设置</uni-th>
      </uni-tr>
      <uni-tr v-for="area in areas" :key="area.id">
        <uni-td align="center">{{ area.id }}</uni-td>
        <uni-td align="center">{{ area.name }}</uni-td>
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
import { getSimpleDeptList } from "@/api/infrastructure/area";

export default {
  data() {
    return {
      areas: [],
      value: ''
    }
  },
  onLoad() {
    this.getAreas();
  },
  methods: {
    getAreas() {
      getSimpleDeptList().then(response => {
        this.areas = response.data.sort((a, b) => a.id - b.id);
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
.area-list {
  margin-top: 20px;
}

.area-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.uni-group {
  display: flex;
  align-items: center;
}
</style>