const hre = require("hardhat");
// const {upgrades} = require("hardhat");


async function deployRegistry(){
    const network = await hre.ethers.provider.getNetwork();
    const networkName = hre.network.name;
    const chainId = Number(network.chainId);
    const account = (await hre.ethers.getSigners())[0];
    const deployerAddress = await account.getAddress();
    const balance = await hre.ethers.provider.getBalance(deployerAddress);

    const signers = await hre.ethers.getSigners();

    for (let index = 0; index < signers.length; index++) {
        const address = signers[index].address;
        console.log("address ",index, ": ", address);
        
    }


    console.log(`
    ////////////////////////////////////////////////////
            Deploys Registry.sol on ${networkName}
    ////////////////////////////////////////////////////
  `)

    console.table({
        networkName: networkName,
        chainId: chainId,
        deployer: deployerAddress,
        deployerBalance: balance
    })

    console.log("Deploying Registry ....");

    const Registry = await hre.ethers.getContractFactory("Registry");
    // const proxyInstance = await upgrades.deployProxy()

    const proxyInstance = await hre.upgrades.deployProxy(Registry, [deployerAddress]);
    
    await proxyInstance.waitForDeployment();

    const implementation = await hre.upgrades.erc1967.getImplementationAddress(proxyInstance.target);

    const proxyAdmin = await hre.upgrades.erc1967.getAdminAddress(proxyInstance.target);
    let proxyAdminOwner = account.address;


    console.log("Registry proxy deployed to:", proxyInstance.target);
    console.log("Registry implementation deployed to:", implementation);
    console.log("Proxy Admin: ", proxyAdmin);
    console.log("Proxy Admin Owner: ", proxyAdminOwner);



}



if (require.main === module) {
    deployRegistry().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
  }