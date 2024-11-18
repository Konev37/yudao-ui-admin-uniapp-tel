<template>
  <view class="content">
    <view v-for="base in bases" :key="base.id" class="card">
      <view class="card-item"><strong>ID:</strong> {{ base.id }}</view>
      <view class="card-item"><strong>设施类型:</strong> {{ base.type }}</view>
      <view class="card-item"><strong>设施容量:</strong> {{ base.capacity }}</view>
      <view class="card-item"><strong>设施配置:</strong> {{ base.configuration }}</view>
      <view class="card-item"><strong>地址:</strong> {{ base.address }}</view>
      <view class="card-item"><strong>经度:</strong> {{ base.longitude }}</view>
      <view class="card-item"><strong>纬度:</strong> {{ base.latitude }}</view>
      <view class="card-item"><strong>建设时间:</strong> {{ base.constructionDate }}</view>
      <view class="card-item"><strong>区域id:</strong> {{ base.areaId }}</view>
      <view class="card-item"><strong>创建人id:</strong> {{ base.creatorId }}</view>
    </view>
  </view>
</template>

<script>
import { getInfrastructurePage } from '@/api/infrastructure/base'

export default {
  data() {
    return {
      bases: [],
      basePageVO: {
        pageNo: 1,
        id: '',
        type: '',
        capacity: '',
        configuration: '',
        address: '',
        longitude: '',
        latitude: '',
        constructionDate: '',
        areaId: '',
        creatorId: '',
        createdAt: '',
      }
    }
  },
  onLoad() {
    this.getBases(this.basePageVO);
  },
  methods: {
    getBases(basePageVO) {
      getInfrastructurePage(basePageVO).then(res => {
        this.bases = res.data.list.sort((a, b) => a.id - b.id);
      })
    }
  },
};
</script>

<style lang="scss">
.uni-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 允许元素换行 */
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: calc(100% - 16px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-item {
  margin-bottom: 8px;
}
</style>
