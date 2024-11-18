<template>
  <view class="content">
    <view class="uni-panel-content">
      <uni-forms ref="pageForm" :modelValue="areaPageVO">
        <uni-forms-item label="ID" name="id">
          <uni-easyinput v-model="areaPageVO.id" placeholder="请输入ID"/>
        </uni-forms-item>
        <uni-forms-item label="名称" name="name">
          <uni-easyinput v-model="areaPageVO.name" placeholder="请输入区域名"/>
        </uni-forms-item>
      </uni-forms>
      <button type="default" size="mini" @click="getAreas(areaPageVO)">查询</button>
      <button type="primary" size="mini" @click="popDialog({}, 'create')">新增</button>
    </view>
    <uni-table :data="areas" border stripe>
      <uni-tr>
        <uni-th width="20px" align="center">ID</uni-th>
        <uni-th width="20px" align="center">区域名</uni-th>
        <uni-th width="20px" align="center">设置</uni-th>
      </uni-tr>
      <uni-tr v-for="area in areas" :key="area.id">
        <uni-td align="center">{{ area.id }}</uni-td>
        <uni-td align="center">{{ area.name }}</uni-td>
        <uni-td>
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary" @click="popDialog(area, 'update')">修改</button>
            <button class="uni-button" size="mini" type="warn">删除</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
    <view>
      <uni-popup ref="updateDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
        <uni-section title="修改区域信息" type="line"/>
        <uni-forms ref="updateForm" :rules="rules" :modelValue="areaSaveVO">
          <uni-forms-item label="区域名" required name="name">
            <uni-easyinput v-model="areaSaveVO.name" placeholder="请输入区域名"/>
          </uni-forms-item>
          <uni-forms-item label="上级区域" required name="parent">
            <uni-data-select
                v-model="areaSaveVO.parentId"
                :localdata="areaSimpleRange"
            ></uni-data-select>
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="updateArea('updateForm')">提交</button>
      </uni-popup>
      <view>
        <uni-popup ref="createDialog" borderRadius="20px 20px 20px 20px" background-color="#fff">
          <uni-section title="新增区域信息" type="line"/>
          <uni-forms ref="createForm" :rules="rules" :modelValue="areaSaveVO">
            <uni-forms-item label="区域名" required name="name">
              <uni-easyinput v-model="areaSaveVO.name" placeholder="请输入区域名"/>
            </uni-forms-item>
            <uni-forms-item label="上级区域" required name="parent">
              <uni-data-select
                  v-model="areaSimpleVO.id"
                  :localdata="areaSimpleRange"
              ></uni-data-select>
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="createArea('createForm')">提交</button>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<script>
import {getDeptPage, getSimpleDeptList, createDept, updateDept} from "@/api/infrastructure/area";
import UniTh from "../../uni_modules/uni-table/components/uni-th/uni-th.vue";

export default {
  components: {UniTh},
  data() {
    return {
      areas: [],
      areaPageVO: {
        id: '',
        name: '',
      },
      areaSimpleVO: {
        id: 0,
        name: '',
        parentId: 0,
      },
      areaSimpleRange: [],
      areaSaveVO: {
        id: '',
        name: '',
        parentId: 0,
        sort: 1,
        status: 0,
      },
      rules: {
        name: [
          {required: true, message: '请输入区域名', trigger: 'blur'}
        ],
        parent: [
          {required: true, message: '请选择上级区域', trigger: 'change'}
        ]
      }
    }
  },
  onLoad() {
    this.getAreas();
    this.getSimpleAreas();
  },
  methods: {
    getAreas(areaPageVO) {
      getDeptPage(areaPageVO).then(response => {
        this.areas = response.data.sort((a, b) => a.id - b.id);
      });
    },
    getSimpleAreas() {
      getSimpleDeptList().then(response => {
        this.areaSimpleRange = response.data.map(area => {
          return {
            value: area.id,
            text: area.name
          }
        });
      });
    },
    popDialog(area, type) {
      if (type === 'update') {
        this.areaSaveVO.id = area.id
        this.areaSaveVO.name = area.name
        this.areaSaveVO.parentId = area.parentId
        this.$refs.updateDialog.open();
      } else if (type === 'create') {
        this.areaSaveVO.name = '';
        this.$refs.createDialog.open();
      }
    },
    createArea(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `新增成功`
        // })
        this.$refs.createDialog.close()
        createDept(this.areaSaveVO).then(response => {
          this.$modal.msgSuccess("新增成功")
          this.getAreas(this.areaPageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
      })
    },
    updateArea(ref) {
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        // uni.showToast({
        //   title: `修改成功`
        // })
        this.$refs.updateDialog.close()
        updateDept(this.areaSaveVO).then(response => {
          this.$modal.msgSuccess("修改成功")
          this.getAreas(this.areaPageVO); // 刷新表格数据
        });
      }).catch(err => {
        console.log('err', err);
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