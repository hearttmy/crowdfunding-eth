import { fundingFactoryInstance, newFundingInstance } from './fundingInstance'
import web3 from "@/utils/InitWeb3";

let getFundingDetails = async (index) => {
    let accounts = await web3.eth.getAccounts();
    let currentFunding = []
    if (index === 1) {
        currentFunding = await fundingFactoryInstance.methods.getAllFundings().call({
            from: accounts[0]
        })
    } else if (index === 2) {
        currentFunding = await fundingFactoryInstance.methods.getCreatorFundings().call({
            from: accounts[0]
        })
    } else if (index === 3) {
        currentFunding = await fundingFactoryInstance.methods.getSupportorFunding().call({
            from: accounts[0]
        })
    }

    let detailsPromises = currentFunding.map(function (fundingAddress) {
        return new Promise(async (resolve, reject) => {
            try {
                let newInstance = newFundingInstance()
                newInstance.options.address = fundingAddress

                let manager = await newInstance.methods.manager().call()
                let projectName = await newInstance.methods.projectName().call()
                let projectDetail = await newInstance.methods.projectDetail().call()
                let targetBalance = await newInstance.methods.targetBalance().call()
                let endTime = await newInstance.methods.endTime().call()
                let balance = await newInstance.methods.getBalance().call()
                let investorsCount = await newInstance.methods.getInvestorsCount().call()

                let detail = { fundingAddress, manager, projectName, projectDetail,targetBalance, endTime, balance, investorsCount }
                resolve(detail)
            } catch (error) {
                reject(error)
            }
        })
    })

    let fundDetailPromise = Promise.all(detailsPromises)

    return fundDetailPromise
}

let createFunding = (projectName, projectDetail, targetMoney, duration) => {
    return new Promise(async (resolve,reject) => {
        try {
            let accounts = await web3.eth.getAccounts();
            let res = await fundingFactoryInstance.methods.createFunding(projectName, projectDetail, targetMoney, duration).send({
                from:accounts[0],
            })
            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}

let investFunding = (fundingAddress,supportBalance) => {

    return new Promise(async (resolve,reject) => {
        try {
            //创建合约实例
            let fundingInstance = newFundingInstance()
            //填充地址
            fundingInstance.options.address = fundingAddress
            //获取投资人地址
            let accounts = await web3.eth.getAccounts()

            let res = await fundingInstance.methods.invest().send({
                from:accounts[0],
                value:supportBalance,
            })
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    getFundingDetails,
    createFunding,
    investFunding,
}