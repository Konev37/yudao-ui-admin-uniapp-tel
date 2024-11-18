<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="basePageVO">
        <uni-forms-item label="ID" name="id">
          <uni-easyinput v-model="basePageVO.id" placeholder="请输入ID" />
        </uni-forms-item>
        <uni-forms-item label="设施类型" name="type">
          <uni-data-select v-model="basePageVO.type" :localdata="[{value: '消防栓', text: '消防栓'}, {value: '垃圾桶', text: '垃圾桶'}]" />
        </uni-forms-item>
      </uni-forms>
      <button type="default" size="mini" @click="getBases(basePageVO)">查询</button>
      <button type="primary" size="mini" @click="popDialog({}, 'create')">新增</button>
    </view>
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
      <view class="uni-group">
        <button class="uni-button" size="mini" type="primary" @click="popDialog(base, 'update')">修改</button>
        <button class="uni-button" size="mini" type="warn" @click="deleteBase(base.id)">删除</button>
      </view>
    </view>
    <view>
      <uni-popup ref="createDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="新增设施信息" type="line" />
        <uni-forms ref="createForm" :modelValue="baseSaveVO">
          <uni-forms-item label="设施类型" required name="type">
            <uni-data-select v-model="baseSaveVO.type" :localdata="[{value: '消防栓', text: '消防栓'}, {value: '垃圾桶', text: '垃圾桶'}]" />
          </uni-forms-item>
          <uni-forms-item label="设施容量" required name="capacity">
            <uni-easyinput v-model="baseSaveVO.capacity" placeholder="请输入设施容量" />
          </uni-forms-item>
          <uni-forms-item label="设施配置" required name="configuration">
            <uni-easyinput v-model="baseSaveVO.configuration" placeholder="请输入设施配置" />
          </uni-forms-item>
          <uni-forms-item label="地址" required name="address">
            <uni-easyinput v-model="baseSaveVO.address" placeholder="请输入地址" />
          </uni-forms-item>
          <uni-forms-item label="经度" required name="longitude">
            <uni-easyinput v-model="baseSaveVO.longitude" placeholder="请输入经度" />
          </uni-forms-item>
          <uni-forms-item label="纬度" required name="latitude">
            <uni-easyinput v-model="baseSaveVO.latitude" placeholder="请输入纬度" />
          </uni-forms-item>
          <uni-forms-item label="建设时间" required name="constructionDate">
            <uni-easyinput v-model="baseSaveVO.constructionDate" placeholder="请输入建设时间" />
          </uni-forms-item>
          <uni-forms-item label="区域id" required name="areaId">
            <uni-easyinput v-model="baseSaveVO.areaId" placeholder="请输入区域id" />
          </uni-forms-item>
          <uni-forms-item label="创建人id" required name="creatorId">
            <uni-easyinput v-model="baseSaveVO.creatorId" placeholder="请输入创建人id" />
          </uni-forms-item>
          <button type="primary" @click="createInfrastructure('createForm')">提交</button>
        </uni-forms>
      </uni-popup>
    </view>
    <view>
      <uni-popup ref="updateDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="修改设施信息" type="line" />
        <uni-forms ref="updateForm" :modelValue="baseSaveVO">
          <uni-forms-item label="设施类型" required name="type">
            <uni-data-select v-model="baseSaveVO.type" :localdata="[{value: '消防栓', text: '消防栓'}, {value: '垃圾桶', text: '垃圾桶'}]" />
          </uni-forms-item>
          <uni-forms-item label="设施容量" required name="capacity">
            <uni-easyinput v-model="baseSaveVO.capacity" placeholder="请输入设施容量" />
          </uni-forms-item>
          <uni-forms-item label="设施配置" required name="configuration">
            <uni-easyinput v-model="baseSaveVO.configuration" placeholder="请输入设施配置" />
          </uni-forms-item>
          <uni-forms-item label="地址" required name="address">
            <uni-easyinput v-model="baseSaveVO.address" placeholder="请输入地址" />
          </uni-forms-item>
          <uni-forms-item label="经度" required name="longitude">
            <uni-easyinput v-model="baseSaveVO.longitude" placeholder="请输入经度" />
          </uni-forms-item>
          <uni-forms-item label="纬度" required name="latitude">
            <uni-easyinput v-model="baseSaveVO.latitude" placeholder="请输入纬度" />
          </uni-forms-item>
          <uni-forms-item label="建设时间" required name="constructionDate">
            <uni-easyinput v-model="baseSaveVO.constructionDate" placeholder="请输入建设时间" />
          </uni-forms-item>
          <uni-forms-item label="区域id" required name="areaId">
            <uni-easyinput v-model="baseSaveVO.areaId" placeholder="请输入区域id" />
          </uni-forms-item>
          <uni-forms-item label="创建人id" required name="creatorId">
            <uni-easyinput v-model="baseSaveVO.creatorId" placeholder="请输入创建人id" />
          </uni-forms-item>
          <button type="primary" @click="updateInfrastructure('updateForm')">提交</button>
        </uni-forms>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getInfrastructurePage, createInfrastructure, updateInfrastructure, deleteInfrastructure } from '@/api/infrastructure/base'

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
      },
      baseSaveVO: {
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
      },
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
    },
    popDialog(base, type) {
      if (type === 'update') {
        this.baseSaveVO = base;
        this.$refs.updateDialog.open();
      } else if (type === 'create') {
        this.$refs.createDialog.open();
      }
    },
    createInfrastructure(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `新增成功`
        // })
        this.$refs.createDialog.close()
        createInfrastructure(this.baseSaveVO).then(response => {
          this.$modal.msgSuccess("新增成功")
          this.getBases(this.basePageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
      })
    },
    updateInfrastructure(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `修改成功`
        // })
        this.$refs.updateDialog.close()
        updateInfrastructure(this.baseSaveVO).then(response => {
          this.$modal.msgSuccess("修改成功")
          this.getBases(this.basePageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
      })
    },
    deleteBase(id) {
      uni.showModal({
        title: '提示',
        content: '确定删除该设施信息吗？',
        success: (res) => {
          if (res.confirm) {
            deleteInfrastructure(id).then(response => {
              this.$modal.msgSuccess("删除成功")
              this.getBases(this.basePageVO); // 刷新表格数据
            });
          }
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
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

.uni-forms-item {
  margin-bottom: 8px; /* 根据需要调整间距 */
}
</style>
