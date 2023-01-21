// const Moralis = require("moralis").default;
// const { EvmChain } = require("@moralisweb3/common-evm-utils");
import Moralis from "./moralisconnection";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const getnfts = async (address) => {
  console.log(address)

  const chain = EvmChain.FUJI;

  const response = await 
    Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    })   

  console.log(response.jsonResponse.result)
  
  let resultnfts = response.jsonResponse.result
  let nfts = await Promise.all(
    resultnfts.map(async nft => {
      let tokenUriRes;
      try {
        tokenUriRes = await (await fetch(nft.token_uri)).json();
      } catch (err) {
        console.error("Bad uri");
      }
      console.log(tokenUriRes)

      let token_address = nft.token_address
      let token_id = nft.token_id
      const nftdetails = {
        token_address,
        token_id,
        tokenUriRes,
      };
      console.log(nftdetails)
      return nftdetails;
    })
  )
  console.log(nfts)
  return (nfts)
}

export default getnfts;