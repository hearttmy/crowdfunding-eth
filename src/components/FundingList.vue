<template>
  <div>
    <div style="overflow: hidden">
      <el-pagination
          background small style="float: right;"
          layout="prev, slot, next, jumper" :page-count="totalPage"
          :current-page.sync="currentPage">
        <span class="page-span">{{ currentPage }}/{{ totalPage }}</span>
      </el-pagination>
    </div>

    <el-row>
      <el-col :span="span" v-for="(funding, i) in fundingList" style="padding: 10px" :key="i">
        <FundingCard :funding="funding"></FundingCard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import FundingCard from "@/components/FundingCard";
export default {
  name: "FundingList",
  components: {FundingCard},
  props: {
    fundingList: Array,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      span: 6,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.fundingList.length / this.pageSize)
    }
  }
}
</script>

<style scoped>
.page-span {
  min-width: 0px !important;
}
</style>