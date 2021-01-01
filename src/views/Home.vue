<template>
  <MainLayout :lg="24">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-tabs type="border-card" style="height: 800px">
          <el-tab-pane label="所有的">
            <FundingList :funding-list="fundingList1"></FundingList>
          </el-tab-pane>
          <el-tab-pane label="我参与的">
            <FundingList :funding-list="fundingList2"></FundingList>
          </el-tab-pane>
          <el-tab-pane label="我管理的">
            <FundingList :funding-list="fundingList3"></FundingList>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6">
        <DetailCard v-if="!$store.state.isEmpty"></DetailCard>
        <el-card v-else style="height: 800px">众筹详情页面, 点击显示详情</el-card>
      </el-col>
    </el-row>

  </MainLayout>
</template>

<script>
import MainLayout from "@/components/MainLayout";
import FundingList from "@/components/FundingList";
import {getFundingDetails} from "@/eth/interface";
import DetailCard from "@/components/DetailCard";

export default {
  name: "Home",
  components: {DetailCard, FundingList, MainLayout},
  data() {
    return {
      fundingList1: [],
      fundingList2: [],
      fundingList3: [],
    }
  },
  created() {
    getFundingDetails(1)
    .then(res => {
      this.fundingList1 = res
    })

    getFundingDetails(2)
    .then(res => {
      this.fundingList2 = res
    })

    getFundingDetails(3)
    .then(res => {
      this.fundingList3 = res
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>