const Verifier = artifacts.require("Verifier");
const UnisonToken = artifacts.require("UnisonToken");
const RandomSource = artifacts.require("Utilities/RandomSource.sol");
const Faucet = artifacts.require("Faucet.sol")

const AgreementLib = artifacts.require("Structs/AgreementLib.sol");

fs = require('fs');

module.exports = async (deployer) => {
  await deployer.deploy(RandomSource);
  await deployer.deploy(UnisonToken);
  await deployer.deploy(AgreementLib);
  await deployer.link(AgreementLib, [Verifier]);
  await deployer.deploy(Verifier, UnisonToken.address, RandomSource.address);

  await deployer.deploy(Faucet, UnisonToken.address);

  var obj = {
    Verifier : "",
    UnisonToken : "",
    Faucet : ""
  }
  obj.Verifier = Verifier.address;
  obj.UnisonToken = UnisonToken.address;
  obj.Faucet = Faucet.address;

  // This file will allow front end to know where the smart contracts have been deployed
  fs.writeFileSync("../frontend_scv/assets/JSON/address.json", JSON.stringify(obj), function(err){
    console.log(err);
  })
};
