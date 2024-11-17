<template>
  <view>
    <uni-section title="本地数据" type="line">
      <uni-data-select
          v-model="value"
          :localdata="range"
          @change="change"
      ></uni-data-select>
    </uni-section>
  </view>
</template>

<script>
import UniSection from "../components/uni-section/uni-section.vue";

export default {
  components: {UniSection},
  data() {
    return {
      value: 0,
      range: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ],
    };
  },
  methods: {
    change(e) {
      console.log("e:", e);
    },
  },
};
</script>

<style lang="scss">
.text {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.uni-px-5 {
  padding-left: 10px;
  padding-right: 10px;
}

.uni-pb-5 {
  padding-bottom: 10px;
}
</style>
