<template>
  <el-card :body-style="'padding: 0px; height: 800px'">
    <img class="funding-cover" src="~@/assets/img/elliot.jpg">
    <div class="part-wrapper">
      <div class="title-wrapper">项目名称：{{$store.state.funding.projectName}}</div>
      <div style="font-size: 15px; color: #999;">{{$store.state.funding.endTime}}</div>
      <div><el-progress :percentage="50"></el-progress></div>
    </div>
    <div class="part-wrapper">
      <div class="title-wrapper">项目简介
        <el-button type="primary" size="mini" @click="detailDialogVisible = true">查看简介</el-button>
      </div>
    </div>
    <div class="part-wrapper">
      <div class="title-wrapper">众筹进度</div>
      <div>已筹：{{$store.state.funding.balance}} wei</div>
      <div>目标：{{$store.state.funding.targetBalance}} wei</div>
      <div>参与人数：{{$store.state.funding.investorsCount}}</div>
    </div>
    <div class="part-wrapper">
      <div class="title-wrapper">众筹创始人</div>
      <div style="word-break: break-all">{{$store.state.funding.manager}}</div>
    </div>
    <div class="bottom-wrapper">
      <div class="btn-wrapper">
        <el-button type="primary">参与众筹</el-button>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary">投票</el-button>
      </div>
    </div>

    <el-dialog title="项目简介" :visible.sync="detailDialogVisible">
      <div>{{$store.state.funding.projectDetail}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "DetailCard",
  data() {
    return {
      detailDialogVisible: false,
    }
  }
}
</script>

<style scoped>
.funding-cover {
  height: 300px;
  width: 100%;
}
.title-wrapper {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.part-wrapper {
  padding: 10px;
  border-bottom: 1px solid #ddd
}

.bottom-wrapper {
  padding: 10px;
}

.bottom-wrapper > .btn-wrapper {
  margin-bottom: 10px;
}

.bottom-wrapper > .btn-wrapper
> .el-button {
  width: 100%;
}

</style>