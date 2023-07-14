import { ethers} from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { solidity } from "ethereum-waffle";

describe("A contract", function () {
  let A;
  let hardhatA: any;
  let signers: SignerWithAddress[]; 
  let owner: SignerWithAddress;
  let wallet:SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  
  //let transferAmmount: BigInt;
  const initialSupply = 7000n;

  beforeEach(async function () {
    A = await ethers.getContractFactory("A");
    signers = await ethers.getSigners();
    //wallet =await ethers.getSigners();
    owner = signers[0];
    wallet= signers[1];
    user1 = signers[2];
    user2 = signers[3];
    const initialSupply = 7000n;
    //console.log("owner address", owner);
    hardhatA = await A.deploy();
    await hardhatA.deployed();
  });
  describe("Right ownerand Deployment", function () {
    it("should check owner is message sender or not", async function () {
      expect(await hardhatA.name()).to.equal("GOLD");
      expect(await hardhatA.symbol()).to.equal("Sona");
      expect(await hardhatA.owner()).to.equal(owner.address);
    });
    it("should mint the initial supply to the owner", async function () {
      const ownerBalance = await hardhatA.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialSupply);
    });
  });
  describe("Transactions and ERC20 Functions", function () {
    it("should transfer tokens", async function () {
      await hardhatA.transfer(user1.address, 200n);
      // Check balances
      const ownerBalance = await hardhatA.balanceOf(owner.address);
      const recipientBalance = await hardhatA.balanceOf(user1.address);
      console.log("Recipient Balance",recipientBalance);
      expect(ownerBalance).to.equal(7000n - 200n);
      expect(recipientBalance).to.equal(200n);
    });
    it("should approve owner from user1 transferfrom user1 address to user2 address", async function () {
      // Set approval for spender(owner) by user1
      await(hardhatA.transfer(user1.address,200n));
      //const balanceBeforeTransfer = hardhatA.balanceOf(user1.address);
      const transferAmount = 100n;
      await (hardhatA
        .connect(user1)
        .approve(owner.address, transferAmount));
        //console.log("Balance Before transfer of user1",balanceBeforeTransfer);
      console.log("spender aka caller balance",await hardhatA.balanceOf(owner.address)
      );
     //Perform transferFrom
      await (hardhatA
        .connect(owner)
        .transferFrom(user1.address, user2.address, transferAmount));
      // Check balances
      const user1Balance = await hardhatA.balanceOf(user1.address);
      const user2Balance = await hardhatA.balanceOf(user2.address);
      expect(user1Balance).to.equal(200n - 100n);
      expect(user2Balance).to.equal(transferAmount);
    });
  });
});
