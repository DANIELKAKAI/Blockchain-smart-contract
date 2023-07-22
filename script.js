//const Web3 = require("web3");

const web3 = new Web3("http://localhost:7545");

const contractABI = [
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
  }
];

const contractBytecode = "608060405234801561001057600080fd5b50610240806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633ef5e445146100465780636537214714610062578063771602f714610080575b600080fd5b610060600480360381019061005b9190610109565b61009c565b005b61006a6100b2565b6040516100779190610158565b60405180910390f35b61009a60048036038101906100959190610109565b6100b8565b005b80826100a891906101a2565b6000819055505050565b60005481565b80826100c491906101d6565b6000819055505050565b600080fd5b6000819050919050565b6100e6816100d3565b81146100f157600080fd5b50565b600081359050610103816100dd565b92915050565b600080604083850312156101205761011f6100ce565b5b600061012e858286016100f4565b925050602061013f858286016100f4565b9150509250929050565b610152816100d3565b82525050565b600060208201905061016d6000830184610149565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101ad826100d3565b91506101b8836100d3565b92508282039050818111156101d0576101cf610173565b5b92915050565b60006101e1826100d3565b91506101ec836100d3565b925082820190508082111561020457610203610173565b5b9291505056fea2646970667358221220f0c8a26df5c99ef966a1f9df31e8d84950449fd35bbc546f033621022131523c64736f6c63430008120033"

let contractAddress;

function deployContract() {

  const SimpleContract = new web3.eth.Contract(contractABI);

  SimpleContract.deploy({
    data: contractBytecode,
  })
    .send({
      from: "0x1C6dFfF0Ec5c1735C4d2c63DB3fdEbAe6ae5b118",
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

async function subtractFunction() {
  const SimpleContract = new web3.eth.Contract(contractABI, contractAddress);

  const number1 = document.getElementById("number1").value;
  const number2 = document.getElementById("number2").value;

  try {
    const accounts = await web3.eth.getAccounts();

    await SimpleContract.methods.subtract(number1, number2).send({
      from: accounts[0],
    });
    const result = await SimpleContract.methods.result().call();
    console.log("Result:", result);
  } catch (error) {
    console.error("Error calling 'add' function:", error);
  }
}