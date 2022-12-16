const Migrations = artifacts.require("Migrations");

fs = require('fs');
path = require('path');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  fs.writeFileSync("../frontend_scv/assets/JSON/address.json","nice", function(err){
    console.log(err);
  })
  console.log(__dirname)
};
