<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="firePageVO">
        <uni-forms-item label="ID" name="id">
          <uni-easyinput v-model="firePageVO.id" placeholder="请输入ID" />
        </uni-forms-item>
        <uni-forms-item label="设施id" name="infrastructureId">
          <uni-easyinput v-model="firePageVO.infrastructureId" placeholder="请输入设施id" />
        </uni-forms-item>
        <uni-forms-item label="类型" name="type">
          <uni-data-select v-model="firePageVO.type" :localdata="[{value: '手动泵', text: '手动泵'}, {value: '自动泵', text: '自动泵'}]" />
        </uni-forms-item>
        <uni-forms-item label="状态" name="status">
          <uni-data-select v-model="firePageVO.status"
                           :localdata="[{value: '使用中', text: '使用中'},
                           {value: '维修中', text: '维修中'},
                           {value: '空闲', text: '空闲'},
                           {value: '损坏', text: '损坏'}]" />
        </uni-forms-item>
      </uni-forms>
      <button type="default" size="mini" @click="getFires(firePageVO)">查询</button>
      <button type="primary" size="mini" @click="popDialog({}, 'create')">新增</button>
    </view>
    <view v-for="fire in fires" :key="fire.id" class="card">
      <view class="card-item"><strong>ID:</strong> {{ fire.id }}</view>
      <view class="card-item"><strong>设施id:</strong> {{ fire.infrastructureId }}</view>
      <view class="card-item"><strong>维护日期:</strong> {{ fire.maintenanceDate }}</view>
      <view class="card-item"><strong>维护人:</strong> {{ fire.maintainer }}</view>
      <view class="card-item"><strong>产品型号:</strong> {{ fire.productModel }}</view>
      <view class="card-item"><strong>类型:</strong> {{ fire.type }}</view>
      <view class="card-item"><strong>状态:</strong> {{ fire.status }}</view>
      <view class="uni-group">
        <button class="uni-button" size="mini" type="primary" @click="popDialog(fire, 'update')">修改</button>
        <button class="uni-button" size="mini" type="warn" @click="deleteFire(fire.id)">删除</button>
      </view>
    </view>
    <view>
      <uni-popup ref="createDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="新增消防设施信息" type="line" />
        <uni-forms ref="createForm" :modelValue="fireSaveVO">
          <uni-forms-item label="设施id" required name="infrastructureId">
            <uni-easyinput v-model="fireSaveVO.infrastructureId" placeholder="请输入基础设施id" />
          </uni-forms-item>
          <uni-forms-item label="维护日期" required name="maintenanceDate">
            <uni-easyinput v-model="fireSaveVO.maintenanceDate" placeholder="请输入维护日期" />
          </uni-forms-item>
          <uni-forms-item label="维护人" required name="maintainer">
            <uni-easyinput v-model="fireSaveVO.maintainer" placeholder="请输入维护人" />
          </uni-forms-item>
          <uni-forms-item label="产品型号" required name="productModel">
            <uni-easyinput v-model="fireSaveVO.productModel" placeholder="请输入产品型号" />
          </uni-forms-item>
          <uni-forms-item label="类型" required name="type">
            <uni-data-select v-model="fireSaveVO.type" :localdata="[{value: '手动泵', text: '手动泵'}, {value: '自动泵', text: '自动泵'}]" />
          </uni-forms-item>
          <uni-forms-item label="状态" required name="status">
            <uni-data-select v-model="fireSaveVO.status"
                             :localdata="[{value: '使用中', text: '使用中'},
                             {value: '维修中', text: '维修中'},
                             {value: '空闲', text: '空闲'},
                             {value: '损坏', text: '损坏'}]" />
          </uni-forms-item>
        </uni-forms>
        <uni-button type="primary" @click="createFire('createForm')">新增</uni-button>
      </uni-popup>
    </view>
    <view>
      <uni-popup ref="updateDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="修改消防设施信息" type="line" />
        <uni-forms ref="updateForm" :modelValue="fireSaveVO">
          <uni-forms-item label="设施id" required name="infrastructureId">
            <uni-easyinput v-model="fireSaveVO.infrastructureId" placeholder="请输入基础设施id" />
          </uni-forms-item>
          <uni-forms-item label="维护日期" required name="maintenanceDate">
            <uni-easyinput v-model="fireSaveVO.maintenanceDate" placeholder="请输入维护日期" />
          </uni-forms-item>
          <uni-forms-item label="维护人" required name="maintainer">
            <uni-easyinput v-model="fireSaveVO.maintainer" placeholder="请输入维护人" />
          </uni-forms-item>
          <uni-forms-item label="产品型号" required name="productModel">
            <uni-easyinput v-model="fireSaveVO.productModel" placeholder="请输入产品型号" />
          </uni-forms-item>
          <uni-forms-item label="类型" required name="type">
            <uni-data-select v-model="fireSaveVO.type" :localdata="[{value: '手动泵', text: '手动泵'}, {value: '自动泵', text: '自动泵'}]" />
          </uni-forms-item>
          <uni-forms-item label="状态" required name="status">
            <uni-data-select v-model="fireSaveVO.status"
                             :localdata="[{value: '使用中', text: '使用中'},
                             {value: '维修中', text: '维修中'},
                             {value: '空闲', text: '空闲'},
                             {value: '损坏', text: '损坏'}]" />
          </uni-forms-item>
        </uni-forms>
        <uni-button type="primary" @click="updateFire('updateForm')">修改</uni-button>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getFirePage, createFire, updateFire, deleteFire } from '@/api/infrastructure/fire'
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";

export default {
  components: {UniPopup, UniForms},
  data() {
    return {
      fires: [],
      firePageVO: {
        pageNo: 1,
        id: '',
        infrastructureId: '',
        maintenanceDate: '',
        maintainer: '',
        productModel: '',
        type: '',
        status: ''
      },
      fireSaveVO: {
        infrastructureId: '',
        maintenanceDate: null,
        maintainer: null,
        productModel: null,
        type: null,
        status: null
      }
    }
  },
  onLoad() {
    this.getFires(this.firePageVO)
  },
  methods: {
    getFires(firePageVO) {
      getFirePage(firePageVO).then(res => {
        this.fires = res.data.list
        //日期转换
        this.fires.forEach(fire => {
          fire.maintenanceDate = fire.maintenanceDate ? new Date(fire.maintenanceDate).toLocaleDateString() : ''
        })
      })
    },
    popDialog(fire, type) {
      if (type === 'update') {
        this.fireSaveVO = fire
        this.$refs.updateDialog.open()
      } else if (type === 'create') {
        this.fireSaveVO.type = null
        this.fireSaveVO.status = null
        this.$refs.createDialog.open()
      }
    },
    createFire(ref) {
      this.$refs[ref].validate().then(() => {
        this.$refs.createDialog.close()
		    if (this.fireSaveVO.type === '') {
          this.fireSaveVO.type = null
        }
        if (this.fireSaveVO.status === '') {
          this.fireSaveVO.status = null
        }
        createFire(this.fireSaveVO).then(() => {
          this.$modal.msgSuccess('新增成功')
          this.getFires(this.firePageVO)
        });
      }).catch(err => {
        console.log('error', err)
      })
    },
    updateFire(ref) {
      this.$refs[ref].validate().then(() => {
        this.$refs.updateDialog.close()
        if(this.fireSaveVO.type === '') {
          this.fireSaveVO.type = null
        }
        if(this.fireSaveVO.status === '') {
          this.fireSaveVO.status = null
        }
        updateFire(this.fireSaveVO).then(() => {
          this.$modal.msgSuccess('修改成功')
          this.getFires(this.firePageVO)
        });
      }).catch(err => {
        console.log('error', err)
      })
    },
    deleteFire(id) {
      uni.showModal({
        title: '提示',
        content: '确定删除该消防设施信息吗？',
        success: (res) => {
          if (res.confirm) {
            deleteFire(id).then(() => {
              this.$modal.msgSuccess('删除成功')
              this.getFires(this.firePageVO)
            });
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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

.uni-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 允许元素换行 */
}
</style>