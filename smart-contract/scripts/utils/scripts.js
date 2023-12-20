// import "dotenv/config";

const { Addressable } = require("ethers");
const fs = require("fs");
const hre = require("hardhat");
const readline = require("readline");


class Deployments {
  // contractName;
  // path;
  // configObject;
  // chainId;

  constructor(chainId, contractName) {
    this.contractName = contractName;
    this.chainId = chainId;
    this.path = `scripts/deployments/${contractName}.deployment.json`;
    this.configObject = this.readFile(this.contractName);
  }

  readFile = (name) => {
    let configFile;
    const path = `scripts/deployments/${name}.deployment.json`;
    try {
      configFile = fs.readFileSync(path);
    } catch {
      configFile = "{}";
    }
    return JSON.parse(configFile.toString());
  };

  write = (objToWrite) => {
    this.configObject[this.chainId] = objToWrite;

    fs.writeFileSync(this.path, JSON.stringify(this.configObject, null, 2));
  };

  get = (chainId) => {
    return this.configObject[chainId];
  };

  getRegistry = () => {
    const obj = this.readFile("registry");
    const registryAddress = obj[this.chainId].proxy ?? "";

    return registryAddress;
  };

  getAllo = () => {
    const obj = this.readFile("allo");
    const alloAddress = obj[this.chainId].proxy ?? "";

    return alloAddress;
  };

  getContractFactory = () => {
    const obj = this.readFile("contractFactory");
    const contractFactoryAddress = obj[this.chainId].address ?? "";

    return contractFactoryAddress;
  };
}

export {Deployments};
