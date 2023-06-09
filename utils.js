const ABI = [
  {
    inputs: [
      { internalType: "address", name: "usdc", type: "address" },
      { internalType: "address", name: "pls", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint8",
        name: "milestone",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "targetAchieved",
        type: "uint256",
      },
    ],
    name: "MilestoneAchieved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "milestone",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PLSDonated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isPaused", type: "bool" },
    ],
    name: "PausedDonation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRefunded",
        type: "uint256",
      },
    ],
    name: "RefundedExcess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "hasStarted",
        type: "bool",
      },
    ],
    name: "SaleStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "uint8",
        name: "milestone",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "USDCDonated",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_MILESTONE",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentMilestone",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "donatePLS",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "donateUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint8", name: "", type: "uint8" },
    ],
    name: "donatedInMilestone",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserDetails",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "plsDonations", type: "uint256" },
          {
            internalType: "uint256",
            name: "usdcOfPlsDonations",
            type: "uint256",
          },
          { internalType: "uint256", name: "usdcDonations", type: "uint256" },
        ],
        internalType: "struct User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "milestone", type: "uint8" }],
    name: "getUsersPerMilestone",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "plsDonations", type: "uint256" },
          {
            internalType: "uint256",
            name: "usdcOfPlsDonations",
            type: "uint256",
          },
          { internalType: "uint256", name: "usdcDonations", type: "uint256" },
        ],
        internalType: "struct User[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasStarted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    name: "milestones",
    outputs: [
      { internalType: "uint256", name: "priceOfPeg", type: "uint256" },
      { internalType: "uint256", name: "usdcRaised", type: "uint256" },
      { internalType: "uint256", name: "usdcOfPlsRaised", type: "uint256" },
      { internalType: "uint256", name: "plsRaised", type: "uint256" },
      { internalType: "uint256", name: "targetAmount", type: "uint256" },
      { internalType: "uint256", name: "totalUSDCRaised", type: "uint256" },
      { internalType: "uint8", name: "milestoneId", type: "uint8" },
      { internalType: "bool", name: "isCleared", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseDonation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "plsToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stopSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unPauseDonation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userBlacklisted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint8", name: "", type: "uint8" },
    ],
    name: "userIndex",
    outputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "users",
    outputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "plsDonations", type: "uint256" },
      { internalType: "uint256", name: "usdcOfPlsDonations", type: "uint256" },
      { internalType: "uint256", name: "usdcDonations", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawPLS",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CLAIM_ABI = [{"inputs":[{"internalType":"address","name":"_tge","type":"address"},{"internalType":"address","name":"_peg","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AddressBlacklisted","type":"error"},{"inputs":[],"name":"NotEnabledToClaim","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isAllow","type":"bool"}],"name":"PegClaimAllowed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PegTokensClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"UserBlacklisted","type":"event"},{"inputs":[],"name":"MAX_MILESTONE","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLS_PEG_ALLOCATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC_PEG_ALLOCATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"calculatePegOwed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimPeg","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enablePegClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"milestone","type":"uint8"}],"name":"getUserDetailsPerMilestone","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"plsDonations","type":"uint256"},{"internalType":"uint256","name":"usdcOfPlsDonations","type":"uint256"},{"internalType":"uint256","name":"usdcDonations","type":"uint256"}],"internalType":"struct User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pegToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user_","type":"address"}],"name":"removeBlacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieveExcessPeg","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user_","type":"address"}],"name":"setBlacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tge","outputs":[{"internalType":"contract ITGE2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPegClaimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userPegClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

var provider = null;
var signer = null;
var main_contract = null;
var claimContract = null;
var address = null;

if (typeof window.ethereum !== "undefined") {
  const CONTRACT_ADDRESS = "0x00f458fe8093f1a915d5fc793bcc1c5b167eb753";
  const CLAIM_CONTRACT_ADDRESS = "0xFAF21AdE088AA74f8C45b9A7341C52af232d2b61"

  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = provider.getSigner();

  let promise = new Promise((resolve, reject) => {
    signer
      .getAddress()
      .then((out) => {
        address = out;
        resolve(address);
      })
      .catch((err) => {
        console.log("error:", err);
        reject();
      });
  });

  promise.then((res) => console.log(res)).catch((err) => console.log(err));
  
  main_contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  claimContract = new ethers.Contract(CLAIM_CONTRACT_ADDRESS, CLAIM_ABI, signer);
} else {
  alert("Please install Metamask");
}
