# Trustmed: An Anti Counterfeit System Using Blockchain

![Trustmed](https://res.cloudinary.com/dvjbswt50/image/upload/v1688968491/trustmed-home_k78pxe.png)

# Table of Contents
+ [About](#description)
+ [Why Blockchain](#why_blockchain)
+ [Technologies Used](#built_with)
+ [Getting Started](#getting_started)
+ [Limitations](#limitations)
+ [Future Scope](#future_scope)

## About <a name="description"></a>
+ How can you tell if a thing you are buying is real in the modern world?
+ The supply chain has been using RFID (Radio Frequency IDentification) technology for anti-counterfeiting measures for more than a decade.
+ This project proposes an idea of a new supply chain system using blockchain to reduce counterfeit products.

### Why blockchain? <a name="why_blockchain"></a>
+ Immutability in decentralized systems ensures that transaction records and product information cannot be tampered with, strengthening the fight against counterfeiting.
+ Blockchain's decentralization fosters trust and collaboration among stakeholders, enabling direct verification and peer-to-peer interactions that contribute to the prevention and detection of counterfeit products.
+ Blockchain's transparency empowers consumers and stakeholders to verify product authenticity by providing an open and auditable record of transactions, thereby bolstering efforts to combat counterfeiting.
+ Blockchain's traceability feature enables the transparent tracking of product movements, making it a powerful tool in combating counterfeiting by verifying the authenticity and origin of goods throughout the supply chain.

## Technologies Used <a name="built_with"></a>
Website:
+ Reactjs
+ SCSS 
+ Material UI

Blockchain:
+ Ethereum (Sepolia testnet)
+ Solidity
+ Hardhat
+ Metamask

## Getting Started <a name="getting_started"></a>
Prerequisites:
+ node@16.13.0 version installed

Steps:
+ clone the repository ``` $ git clone https://github.com/Joiyad/TrustMed.git ```
+ installing the dependencies ``` cd Trustmed ```
+ ``` npm install ```
+ Create a .env file and make three variables REACT_APP_CONTRACT_ADDRESS, REACT_APP_INFURA_API_KEY, REACT_APP_SEPOLIA_PRIVATE_KEY.
+ Open metamask and first connect sepolia testnet and then set REACT_APP_SEPOLIA_PRIVATE_KEY equal to your private key.
+ Go to infura and register to get INFURA API KEY and set REACT_APP_INFURA_API_KEY.
+ Deploy the smart contract using hardhat: ```npx hardhat compile``` and ```npx hardhat run --network sepolia scripts/deploy.js```. if it runs successfully, you will get contract address. set REACT_APP_CONTRACT_ADDRESS variable with this value.
+ All set, run ```npm start```
 
## Limitations <a name="limitations"></a>
+ To check the product information, the user needs a QR code scanner.
+ Currently, dependent on Organization to register with us.

## Future Scope <a name="future_scope"></a>
+ Can be implemented in other fields.
+ QR Code related service integration with our platform
