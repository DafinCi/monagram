export const MONAGRAM_CONTRACT_ADDRESS =
  "0x35c7742DCfe39d994d6dCc581DaF4ABFeB191A0c";

export const MONAGRAM_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "persona",
        type: "string",
      },
    ],
    name: "mintIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
