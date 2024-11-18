<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="trashPageVO">
        <uni-forms-item label="ID" name="id">
          <uni-easyinput v-model="trashPageVO.id" placeholder="请输入ID" />
        </uni-forms-item>
        <uni-forms-item label="设施id" name="infrastructureId">
          <uni-easyinput v-model="trashPageVO.infrastructureId" placeholder="请输入设施id" />
        </uni-forms-item>
        <uni-forms-item label="是否分类" name="hasClassification">
          <uni-data-select v-model="trashPageVO.hasClassification" :localdata="[{value: 'true', text: '是'}, {value: 'false', text: '否'}]" />
        </uni-forms-item>
        <uni-forms-item label="产品型号" name="productModel">
          <uni-easyinput v-model="trashPageVO.productModel" placeholder="请输入产品型号" />
        </uni-forms-item>
        <uni-forms-item label="状态" name="status">
          <uni-data-select v-model="trashPageVO.status"
                           :localdata="[{value: '空闲', text: '空闲'},
                           {value: '满载', text: '满载'},
                           {value: '损坏', text: '损坏'},
                           {value: '维修中', text: '维修中'}]" />
        </uni-forms-item>
      </uni-forms>
      <uni-button type="default" size="mini" @click="getTrashes(trashPageVO)">查询</uni-button>
      <uni-button type="primary" size="mini" @click="popDialog({}, 'create')">新增</uni-button>
    </view>
    <view v-for="trash in trashes" :key="trash.id" class="card">
      <view class="card-item"><strong>ID:</strong> {{ trash.id }}</view>
      <view class="card-item"><strong>设施id:</strong> {{ trash.infrastructureId }}</view>
      <view class="card-item"><strong>是否分类:</strong> {{ trash.hasClassification }}</view>
      <view class="card-item"><strong>产品型号:</strong> {{ trash.productModel }}</view>
      <view class="card-item"><strong>状态:</strong> {{ trash.status }}</view>
      <view class="uni-group">
        <button class="uni-button" size="mini" type="primary" @click="popDialog(trash, 'update')">修改</button>
        <button class="uni-button" size="mini" type="warn" @click="deleteTrash(trash.id)">删除</button>
      </view>
    </view>
    <view>
      <uni-popup ref="createDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="新增垃圾桶信息" type="line" />
        <uni-forms ref="createForm" :modelValue="trashSaveVO">
          <uni-forms-item label="设施id" required name="infrastructureId">
            <uni-easyinput v-model="trashSaveVO.infrastructureId" placeholder="请输入基础设施id" />
          </uni-forms-item>
          <uni-forms-item label="是否分类" required name="hasClassification">
            <uni-data-select v-model="trashSaveVO.hasClassification" :localdata="[{value: 'true', text: '是'}, {value: 'false', text: '否'}]" />
          </uni-forms-item>
          <uni-forms-item label="产品型号" required name="productModel">
            <uni-easyinput v-model="trashSaveVO.productModel" placeholder="请输入产品型号" />
          </uni-forms-item>
          <uni-forms-item label="状态" required name="status">
            <uni-data-select v-model="trashSaveVO.status"
                             :localdata="[{value: '空闲', text: '空闲'},
                             {value: '满载', text: '满载'},
                             {value: '损坏', text: '损坏'},
                             {value: '维修中', text: '维修中'}]" />
          </uni-forms-item>
        </uni-forms>
        <uni-button type="primary" size="mini" @click="createTrash('createForm')">新增</uni-button>
      </uni-popup>
    </view>
    <view>
      <uni-popup ref="updateDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="修改垃圾桶信息" type="line" />
        <uni-forms ref="updateForm" :modelValue="trashSaveVO">
          <uni-forms-item label="设施id" required name="infrastructureId">
            <uni-easyinput v-model="trashSaveVO.infrastructureId" placeholder="请输入基础设施id" />
          </uni-forms-item>
          <uni-forms-item label="是否分类" required name="hasClassification">
            <uni-data-select v-model="trashSaveVO.hasClassification" :localdata="[{value: 'true', text: '是'}, {value: 'false', text: '否'}]" />
          </uni-forms-item>
          <uni-forms-item label="产品型号" required name="productModel">
            <uni-easyinput v-model="trashSaveVO.productModel" placeholder="请输入产品型号" />
          </uni-forms-item>
          <uni-forms-item label="状态" required name="status">
            <uni-data-select v-model="trashSaveVO.status"
                             :localdata="[{value: '空闲', text: '空闲'},
                             {value: '满载', text: '满载'},
                             {value: '损坏', text: '损坏'},
                             {value: '维修中', text: '维修中'}]" />
          </uni-forms-item>
        </uni-forms>
        <uni-button type="primary" size="mini" @click="updateTrash('updateForm')">修改</uni-button>
      </uni-popup>
    </view>
  </view>
</template>


<script>
import { getTrashPage, createTrash, updateTrash, deleteTrash } from '@/api/infrastructure/trash'
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";

export default {
  components: {UniForms},
  data() {
    return {
      trashes: [],
      trashPageVO: {
        pageNo: 1,
        id: '',
        infrastructureId: '',
        hasClassification: '',
        productModel: '',
        status: ''
      },
      trashSaveVO: {
        infrastructureId: null,
        hasClassification: null,
        productModel: null,
        status: null
      },
    }
  },
  onLoad() {
    this.getTrashes(this.trashPageVO)
  },
  methods: {
    getTrashes(trashPageVO) {
      getTrashPage(trashPageVO).then(res => {
        this.trashes = res.data.list
        // 将布尔值转换为字符串
        this.trashes.forEach(trash => {
          trash.hasClassification = trash.hasClassification ? '是' : '否'
        })
      })
    },
    popDialog(trash, type) {
      if (type === 'update') {
        // this.trashSaveVO = JSON.parse(JSON.stringify(trash))
        this.trashSaveVO = trash
        this.trashSaveVO.hasClassification = trash.hasClassification ? '是' : '否'
        this.$refs.updateDialog.open()
      } else if (type === 'create') {
        this.$refs.createDialog.open()
      }
    },
    createTrash(ref) {
      this.$refs[ref].validate().then(() => {
        this.$refs.createDialog.close()
        if (this.trashSaveVO.hasClassification === '') {
          this.trashSaveVO.hasClassification = null
        }
        if (this.trashSaveVO.status === '') {
          this.trashSaveVO.status = null
        }
        createTrash(this.trashSaveVO).then(() => {
          this.$modal.msgSuccess('新增成功')
          this.getTrashes(this.trashPageVO)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    updateTrash(ref) {
      this.$refs[ref].validate().then(() => {
        this.$refs.updateDialog.close()
        if (this.trashSaveVO.hasClassification === '') {
          this.trashSaveVO.hasClassification = null
        }
        if (this.trashSaveVO.status === '') {
          this.trashSaveVO.status = null
        }
        // 将'是'和'否'转换为布尔值
        if (this.trashSaveVO.hasClassification === '是') {
          this.trashSaveVO.hasClassification = true
        } else if (this.trashSaveVO.hasClassification === '否') {
          this.trashSaveVO.hasClassification = false
        }
        updateTrash(this.trashSaveVO).then(() => {
          this.$modal.msgSuccess('修改成功')
          this.getTrashes(this.trashPageVO)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    deleteTrash(id) {
      uni.showModal({
        title: '提示',
        content: '确定删除吗？',
        success: (res) => {
          if (res.confirm) {
            deleteTrash(id).then(() => {
              this.$modal.msgSuccess('删除成功')
              this.getTrashes(this.trashPageVO)
            })
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