<template>
  <el-card :body-style="'padding: 0px; height: 800px'">
    <img class="funding-cover" src="~@/assets/img/elliot.jpg">
    <div class="part-wrapper">
      <div class="title-wrapper">项目名称：{{$store.state.funding.projectName}}</div>
      <div style="font-size: 15px; color: #999;">{{remainTime}} 天</div>
      <div><el-progress :percentage="timePercent"></el-progress></div>
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
      <el-row :gutter="20">
        <el-col :span="12" style="margin-bottom: 10px">
          <el-button style="width: 100%" type="primary" @click="investDialogVisible = true">参与众筹</el-button>
        </el-col>
        <el-col :span="12">
          <el-button style="width: 100%" type="primary">投票</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button style="width: 100%" type="success">资金请求</el-button>
        </el-col>
        <el-col :span="12">
          <el-button style="width: 100%" type="danger">众筹撤销</el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="项目简介" :visible.sync="detailDialogVisible" :close-on-click-modal="false">
      <div>{{$store.state.funding.projectDetail}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="参与众筹" :visible.sync="investDialogVisible" :close-on-click-modal="false">
      <el-form :model="investForm" label-width="100px" style="width: 500px" ref="investForm"
      :rules="investFormRules">
        <el-form-item label="项目名称:">
          <span>{{$store.state.funding.projectName}}</span>
        </el-form-item>
        <el-form-item label="项目地址:">
          <span>{{$store.state.funding.fundingAddress}}</span>
        </el-form-item>
        <el-form-item label="投资金额:" prop="investBalance">
          <el-input v-model.number="investForm.investBalance"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitInvestForm('investForm')">发起众筹</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="investDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { investFunding } from '@/eth/interface'

export default {
  name: "DetailCard",
  data() {
    const validateInvest = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error('众筹金额不能为 0'));
      }
      else if (value > this.$store.state.funding.targetBalance -
          this.$store.state.funding.balance) {
        callback(new Error('众筹金额超过众筹上限'));
      }
      else {
        callback();
      }
    };

    return {
      detailDialogVisible: false,
      investDialogVisible: false,
      voteDialogVisible: false,
      requestDialogVisible: false,
      investForm: {
        investBalance: 0,
      },
      investFormRules: {
        investBalance: [
          { type: 'number', message: '金额必须为数字值'},
          { validator: validateInvest, trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    remainTime() {
      return (this.$store.state.funding.endTime - (new Date).valueOf()) / (1000*3600*24)
    },
    timePercent() {
      if (this.$store.state.funding.endTime > (new Date).valueOf())
        return Math.ceil(( 1 - (this.$store.state.funding.endTime - (new Date).valueOf())
          / (this.$store.state.funding.endTime - this.$store.state.funding.startTime)) * 100)
      else
        return 100
    },
  },
  methods: {
    submitInvestForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          investFunding(this.$store.state.funding.fundingAddress, this.investForm.investBalance)
          .then(res => {
            console.log('123')
          })
        }
      })
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

</style>