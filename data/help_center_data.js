const help_center_data = [
	{
		id: '0Getting started',
		title: 'Getting started',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		id: '1Buying',
		title: 'Buying',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		id: '2Selling',
		title: 'Selling',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		id: '3Creating',
		title: 'Creating',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		id: '4User Safety',
		title: 'User Safety',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		id: '5Partners',
		title: 'Partners',
		text: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
];

const accordion_data = [
	{
		id: '0How do I create an NFT?',
		title: 'How do I create an NFT?',
		text: 'The marketplace offers NFT minting capabilities in accordance with both ERC721 and ERC4907 standards. While NFTs are utilized to uniquely represent assets, storing the actual asset alongside the NFT on the blockchain poses challenges due to limited space. As a solution, the marketplace leverages the IPFS (InterPlanetary File System) by utilizing the API connection offered by Pinata to securely store the user-provided assets. Subsequently, a pointer to the IPFS address is associated with the NFT, enabling seamless integration through the ERC721URIStorage extension provided by the openzeppelin library[2].',
	},
	{
		id: '1How can I list a NFT ?',
		title: 'How can I list a NFT ?',
		text: 'Marketplace offers comprehensive NFT trading functionalities, including Buy/Sell, Rentals with upfront payment, and Rentals with installment-based payment. To facilitate these functionalities, the marketplace enables traders interested in selling or renting their NFTs to list their orders within the platform. The listing information is stored using custom-defined solidity structs, ensuring the capture of vital details specific to each listing type. Table X illustrates the varying information stored for each listing type, providing a foundation for future transactions and preserving crucial order-related information.',
	},
	{
		id: '2How to buy a NFT ?',
		title: 'How to buy a NFT ?',
		text: "The marketplace's explore interface enables users to browse through the existing sell orders. It is important to note that the developed marketplace supports the sale of NFTs based on both ERC721 and ERC4907 standards. When users come across an order that meets their requirements, they can initiate a buy request, prompting the interface to display the payment amount required to complete the transaction. If the user agrees with the amount, the Metamask wallet will request an additional confirmation to proceed with the transaction, transferring the corresponding amount to the seller's account. As the buying process triggers a state change in the marketplace contract, the Event listener captures the successful purchase of an NFT, ensuring a seamless user interface experience.",
	},
	{
		id: '3What are the two types of rentals ?',
		title: 'What are the two types of rentals ?',
		text: 'The Avian Finance NFT marketplace introduces two user-friendly rental mechanisms: upfront payment and installment-based payment. In the upfront rental option, the renter is required to make the full rental fee payment in advance to gain immediate access to user privileges. On the other hand, the installment-based version allows the renter to enjoy user privileges right from the start while completing the rental payment in agreed-upon installments.		',
	},
	{
		id: '4What are upfront rentals',
		title: 'What are upfront rentals',
		text: "The introduction of the ERC4907 standard revolutionized the NFT ecosystem, addressing the limitations of collateral-based rentals. This standard introduced user roles and expiry times. When checking the user of an ERC4907 NFT, the contract verifies if the expiry time has passed. If expired, the owner is recognized as the user; otherwise, the assigned wallet address for the user role is recognized. Leveraging this functionality, NFT rentals became seamless. From the lender's perspective, they can lend their ERC4907 NFTs by approving the marketplace as a handler and listing their lending order with the intended NFT and rental price. Renters can explore listings, view details, and submit rent requests, while the marketplace assigns the renter as the new user, updates the expiry time, and transfers the rental fee to the lender. Successful rentals do not delete listing data, allowing reuse, and the user role does not require re-updating due to ERC4907 implementation.",
	},
	{
		id: '4What are installment-based rentals',
		title: 'What are installment-based rentals',
		text: "One significant drawback of the existing rental methodology is that renters are required to pay the full rental fee upfront, regardless of their actual duration of NFT usage. This inefficiency becomes apparent when a trader rents an NFT for a specific period but no longer needs it before the rental term ends. For instance, if the initial requirement was for five days but usage ceases on day three, the renter effectively pays for two unused days. This risk can be mitigated by introducing installment-based rentals. In line with this, the proposed NFT marketplace introduces installment-based NFT rentals based on the original ERC4907 standard. \n To initiate an installment-based rental, the owner lists the NFT accordingly, and the marketplace displays the listing for other traders. The listing procedure for installment-based rentals is similar to that of upfront rentals. When a trader wishes to rent the NFT, they can initiate the rental agreement by paying the first installment. Upon receiving the first installment, the marketplace updates the NFT's user access for one day. Before the day concludes, the renter must complete the next installment, which extends their access validity. Alternatively, all installments can be paid at once, aligning with the upfront rental procedure.",
	},
	{
		id: '4What is wrapping a NFT Collection',
		title: 'Smart Contract Upgrade: What You Need to Know',
		text: "The wrapper implementation serves as an intermediary layer, facilitating the conversion of ERC-721 tokens into ERC-4907 tokens, thereby enabling seamless rentals. Suppose a user owns a collection of ERC721-based NFTs and intends to convert a portion of them to the ERC4907 standard. In such a scenario, the system initiates the deployment of a new smart contract, which acts as the wrapper for the existing NFT collection. This newly deployed smart contract extends the ERC4907 implementation to incorporate rental functionality and implements the IERC721Receiver interface to support the wrapping process. \n To upgrade the NFTs, the user must deposit the desired NFTs into the newly deployed wrapper collection. This depositing functionality is accomplished through the IERC721Receiver interface by transferring the ownership of the NFTs to the wrapper collection. Once the user wishes to utilize the NFTs in their upgraded state, they can withdraw the deposited NFTs from the wrapper collection and utilize them solely with the ERC721 functionality.",
	},
];

export { help_center_data, accordion_data };
