//const Web3 = require("web3");

const web3 = new Web3("http://localhost:7545");

const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "number1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "number2",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "result",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "number1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "number2",
        "type": "uint256"
      }
    ],
    "name": "subtract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractBytecode = "60806040526000600160146101000a81548160ff02191690831515021790555034801561002b57600080fd5b50600160149054906101000a900460ff161561007c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161007390610139565b60405180910390fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060146101000a81548160ff021916908315150217905550610159565b600082825260208201905092915050565b7f497320616c7265616479206465706c6f79656400000000000000000000000000600082015250565b60006101236013836100dc565b915061012e826100ed565b602082019050919050565b6000602082019050818103600083015261015281610116565b9050919050565b6103dd806101686000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633ef5e445146100465780636537214714610062578063771602f714610080575b600080fd5b610060600480360381019061005b9190610229565b61009c565b005b61006a610142565b6040516100779190610278565b60405180910390f35b61009a60048036038101906100959190610229565b610148565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461012c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610123906102f0565b60405180910390fd5b8082610138919061033f565b6000819055505050565b60005481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101cf906102f0565b60405180910390fd5b80826101e49190610373565b6000819055505050565b600080fd5b6000819050919050565b610206816101f3565b811461021157600080fd5b50565b600081359050610223816101fd565b92915050565b600080604083850312156102405761023f6101ee565b5b600061024e85828601610214565b925050602061025f85828601610214565b9150509250929050565b610272816101f3565b82525050565b600060208201905061028d6000830184610269565b92915050565b600082825260208201905092915050565b7f4f6e6c79204f776e65722063616e20646f207468697300000000000000000000600082015250565b60006102da601683610293565b91506102e5826102a4565b602082019050919050565b60006020820190508181036000830152610309816102cd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061034a826101f3565b9150610355836101f3565b925082820390508181111561036d5761036c610310565b5b92915050565b600061037e826101f3565b9150610389836101f3565b92508282019050808211156103a1576103a0610310565b5b9291505056fea2646970667358221220d2d78bf079587ee392e207478a431c98c387c5d8f494d2542b693ca53e70667064736f6c63430008120033";

let contractAddress;


function deployContract() {

  const SimpleContract = new web3.eth.Contract(contractABI);

  SimpleContract.deploy({
    data: contractBytecode,
  })
    .send({
      from: "0x11f0A896353e9FEEAdaBEAD323D3F7393CdB42C8",
      gas: 1500000,
      gasPrice: "30000000000",
    })
    .on("receipt", function (receipt) {
      contractAddress = receipt.contractAddress;
      console.log("Contract deployed at:", contractAddress);
    })
    .on("error", function (error) {
      console.error("Error deploying contract:", error);
    });
}

async function callAddFunction() {
  const SimpleContract = new web3.eth.Contract(contractABI, contractAddress);

  const number1 = document.getElementById("number1").value;
  const number2 = document.getElementById("number2").value;

  try {
    const accounts = await web3.eth.getAccounts();

    await SimpleContract.methods.add(number1, number2).send({
      from: accounts[0],
    });
    const result = await SimpleContract.methods.result().call();
    console.log("Result:", result);
  } catch (error) {
    console.error("Error calling 'add' function:", error);
  }
}


async function callSubtractFunction() {
  const SimpleContract = new web3.eth.Contract(contractABI, contractAddress);

  const number1 = document.getElementById("number1").value;
  const number2 = document.getElementById("number2").value;

  try {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts);

    await SimpleContract.methods.subtract(number1, number2).send({
      from: accounts[0],
    });
    const result = await SimpleContract.methods.result().call();
    console.log("Result:", result);
  } catch (error) {
    console.error("Error calling 'add' function:", error);
  }
}

