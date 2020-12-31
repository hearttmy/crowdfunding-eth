<template>
  <MainLayout :lg="18">
    <el-row :gutter="10">
      <el-col :span="17">
        <el-tabs type="border-card">
          <el-tab-pane label="所有的">
            <FundingList :funding-list="fundingList"></FundingList>
          </el-tab-pane>
          <el-tab-pane label="我参与的">
            <FundingList :funding-list="fundingList"></FundingList>
          </el-tab-pane>
          <el-tab-pane label="我管理的">
            <FundingList :funding-list="fundingList"></FundingList>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="7">
        <el-card>
          132
        </el-card>
      </el-col>
    </el-row>

  </MainLayout>
</template>

<script>
import MainLayout from "@/components/MainLayout";
import FundingList from "@/components/FundingList";
export default {
  name: "Home",
  components: {FundingList, MainLayout},
  data() {
    return {
      fundingList: [1, 2],
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>