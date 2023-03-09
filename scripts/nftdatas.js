// import {connectMoralis} from "./moralisconnection";
import Moralis from "moralis";
import { EvmChain } from '@moralisweb3/common-evm-utils';

const nftdatas = async (address, tokenId) => {
    const chain = EvmChain.FUJI;
    console.log(address)
    console.log(tokenId)

    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: '7vrliQAzsM0MKcL8wHIQMPAGnUGzWTLwxWYPoyHciUGeRR2z1vlwbxw3oX3NpGsd',
            // ...and any other configuration
        });
    }

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });

    const response1 = await Moralis.EvmApi.nft.getNFTTransfers({
        address,
        tokenId,
        chain,
    });


    let tokenUriRes
	try {
		tokenUriRes = await (await fetch(response.jsonResponse.token_uri)).json();
	} catch (err) {
		console.error("Bad uri");
	}

    let jsnresponse = response.jsonResponse
    let transactionhistory = response1.jsonResponse.result
    const nftdetails = {
        jsnresponse,
        tokenUriRes,
        transactionhistory,
    };
    
    return(nftdetails)

}

export default nftdatas;