// import {connectMoralis} from "./moralisconnection";
import Moralis from "moralis";
import { EvmChain } from '@moralisweb3/common-evm-utils';

const nftdatas = async () => {
    const chain = EvmChain.FUJI;

    const address = "0xA5e80F4980878b7C2c23D6fA002358A47d0060a3"
    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: '7vrliQAzsM0MKcL8wHIQMPAGnUGzWTLwxWYPoyHciUGeRR2z1vlwbxw3oX3NpGsd',
            // ...and any other configuration
        });
    }
    
    console.log(Moralis.EvmApi)
    let tokenId = '19'

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });

    let tokenUriRes
	try {
		tokenUriRes = await (await fetch(response.jsonResponse.token_uri)).json();
	} catch (err) {
		console.error("Bad uri");
	}

    let jsnresponse = response.jsonResponse

    const nftdetails = {
        jsnresponse,
        tokenUriRes,
    };
    console.log(nftdetails)
    return(nftdetails)

}

export default nftdatas;