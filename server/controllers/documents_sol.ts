import * as Web3 from 'web3';
const DocsArtifacts = require('../contracts/Documents.json');
import {ABI_PATH, CONTRACT_ADDRESS, HTTP_PROVIDER, JSON_PATH, ACCOUNT, PASSWD} from "../enviroments/enviroment";

let accountState = false;

export const setAccountState = (state: boolean) => {
    accountState = state;
}

export const getAccountState = () => {
    return accountState;
}

export const changeEthOwner = async (contract: any, owner: any) => {

    try {
        const owner = await contract.owner();
        await contract.changeOwner(owner, {from: owner,  gas: 200000});
    } catch (err) {
        return err;
    }
};


export const getEthConnection = async () => {
    console.log("(getEthConnection) parametry -> : " + HTTP_PROVIDER + " : " + CONTRACT_ADDRESS);
    const web3 = await new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    let contract;

    const isAddress = web3.isAddress(CONTRACT_ADDRESS);
    console.log("(getEthConnection) isAddress -> " + isAddress);
    let contracts = DocsArtifacts["contracts"]["Documents.sol:Documents"];
    let abi = JSON.parse(contracts.abi);
    if (isAddress) {
        contract = await web3.eth.contract(abi).at(CONTRACT_ADDRESS);
    }
    console.log("(getEthConnection) account unlocked: " + getAccountState());
    if (!getAccountState()) {
        try {
            web3.personal.unlockAccount(ACCOUNT, PASSWD, 0);
            setAccountState(true);
            const event = contract.Deposit();
        } catch (e) {
            console.log(e);
            return;
        }
    }

    return contract;
};

export const getEthOwner = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        return owner;
    } catch (err) {
        return err
    }
}

export const addEthHash = async (hash: any, clientId: any, docId: any) => {
    try {
        console.log("(addETHHash) docId: " + docId+" clientId: "+clientId+" Hash: "+hash+":");
        let contract = await getEthConnection();
        const owner = await contract.owner();
        const transactionId = await contract.addHash(clientId, '0x'+hash, docId, { from: ACCOUNT , gas: 200000});
        console.log("(addETHHash) transactionId : " + transactionId);
        return transactionId;
    } catch (err) {
        return err;
    }
}

export const verifyEthHash = async (hash: any, clientId: any) => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        console.log("(verifyETHHash) owner -> " + clientId + " : " + hash);
       // console.log("size : "+ await contract.hashsize(clientId));
        return await contract.Verify(clientId, hash, { from: ACCOUNT , gas: 200000});
    } catch (err) {
        return err;
    }
}

export const getEthHash = async (clientId: any, docId: any) => {
    try {
        console.log("(getETHHash) przyjalem parametry -> "+clientId+ " : " + docId);
        let contract = await getEthConnection();
        const owner = await contract.owner();
        console.log("(getETHHash) owner -> " + owner);
        let hash = await contract.getHash(clientId, docId, { from: ACCOUNT, gas: 200000});
        console.log("(getETHHash) hash -> " + hash);
        return hash;
    } catch (err) {
        console.log("(getETHHash) err -> " + err);
        return 'err';
    }
}


export const getEthLastBlock = async () => {
    const web3 = await new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    const res = await web3.eth.getBlock('latest');
    return res;
}

export const deactivateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner()
        await contract.deactivate({from: ACCOUNT,  gas: 200000});
        return 1;
    } catch (err) {
        return err;
    }
}

export const activateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        await contract.activate({from: ACCOUNT, gas: 200000});
        return 1;
    } catch (err) {
        return err;
    }
}


export const getStateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        let state = await contract.state();
        return state;
    } catch (err) {
       return err;
    }
}

export const getEthHistory = async (hash: any) => {
    const web3 = await new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    console.log(hash);
    const res = await web3.eth.getTransaction(hash);
    console.log(res);
    return res;
}



