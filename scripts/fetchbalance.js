import { fetchBalance } from '@wagmi/core'
// const fetchBalance = require('@wagmi/core')

const getbalance =  async (address) => {
    return await fetchBalance({
        address: address,
    })
}

// getbalance()
export default getbalance;