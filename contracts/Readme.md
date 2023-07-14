provided by 

interface HardhatEthersHelpers {
  getContractAtWithSignerAddress: <ContractType extends ethers.BaseContract = ethers.BaseContract>(nameOrAbi: string | any[], address: string, signer: string) => Promise<ContractType>;
  getSignerOrNull: (address: string) => Promise<SignerWithAddress | null>;
  getNamedSigners: () => Promise<Record<string, SignerWithAddress>>;
  getNamedSigner: (name: string) => Promise<SignerWithAddress>;
  getNamedSignerOrNull: (name: string) => Promise<SignerWithAddress | null>;
  getUnnamedSigners: () => Promise<SignerWithAddress[]>;
  getContract: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType>;
  getContractOrNull: <ContractType extends ethers.BaseContract = ethers.BaseContract>(name: string, signer?: ethers.Signer | string) => Promise<ContractType | null>;
}