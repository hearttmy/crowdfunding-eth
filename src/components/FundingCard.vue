<template>
  <el-card :body-style="'padding: 0px'" @click.native="selectFunding">
    <img class="funding-cover" src="~@/assets/img/elliot.jpg">
    <div style="padding: 10px">
      <div style="font-size: 20px; font-weight: bold;">{{funding.projectName}}</div>
      <div style="font-size: 15px; color: #999;">{{funding.endTime}}</div>
      <div><el-progress :percentage="50"></el-progress></div>
    </div>
    <div>
      <el-row type="flex">
        <el-col class="bottom-bar-col">
          <div>已筹</div>
          {{funding.balance}} wei
        </el-col>
        <el-col class="bottom-bar-col">
          <div>已达</div>

        </el-col>
        <el-col class="bottom-bar-col">
          <div>参与人数</div>
          {{funding.investorsCount}} 人
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "FundingCard",
  props: {
    funding: {
      type: Object,
    }
  },
  methods: {
    selectFunding() {
      this.$store.commit('updateFunding', this.funding)
    }
  }
}
</script>

<style scoped>
.funding-cover {
  height: 200px;
  width: 100%;
}

.el-card:hover {
  cursor: pointer;
}

.bottom-bar-col {
  border: 1px solid #ddd;
  text-align: center;
}
</style>