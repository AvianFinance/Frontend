import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const getnfts = async (address) => {

  const chain = EvmChain.FUJI;
 
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
        apiKey: '7vrliQAzsM0MKcL8wHIQMPAGnUGzWTLwxWYPoyHciUGeRR2z1vlwbxw3oX3NpGsd',
        // ...and any other configuration
    });
  }

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  })  
  
  let resultnfts = response.jsonResponse.result
  let nfts = await Promise.all(
    resultnfts.map(async nft => {
      let tokenUriRes;
      try {
        tokenUriRes = await (await fetch(nft.token_uri)).json();
      } catch (err) {
        console.error("Bad uri");
      }

      let token_address = nft.token_address
      let token_id = nft.token_id
      const nftdetails = {
        token_address,
        token_id,
        tokenUriRes,
      };
      return nftdetails;
    })
  )
  return (nfts)
}

export default getnfts;