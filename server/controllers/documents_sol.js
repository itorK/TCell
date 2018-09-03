"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const DocsArtifacts = require('../contracts/Documents.json');
const enviroment_1 = require("../enviroments/enviroment");
let accountState = false;
exports.setAccountState = (state) => {
    accountState = state;
};
exports.getAccountState = () => {
    return accountState;
};
exports.changeEthOwner = (contract, owner) => __awaiter(this, void 0, void 0, function* () {
    try {
        const owner = yield contract.owner();
        yield contract.changeOwner(owner, { from: owner, gas: 200000 });
    }
    catch (err) {
        return err;
    }
});
exports.getEthConnection = () => __awaiter(this, void 0, void 0, function* () {
    console.log("(getEthConnection) parametry -> : " + enviroment_1.HTTP_PROVIDER + " : " + enviroment_1.CONTRACT_ADDRESS);
    const web3 = yield new Web3(new Web3.providers.HttpProvider(enviroment_1.HTTP_PROVIDER));
    let contract;
    const isAddress = web3.isAddress(enviroment_1.CONTRACT_ADDRESS);
    console.log("(getEthConnection) isAddress -> " + isAddress);
    let contracts = DocsArtifacts["contracts"]["Documents.sol:Documents"];
    let abi = JSON.parse(contracts.abi);
    if (isAddress) {
        contract = yield web3.eth.contract(abi).at(enviroment_1.CONTRACT_ADDRESS);
    }
    console.log("(getEthConnection) account unlocked: " + exports.getAccountState());
    if (!exports.getAccountState()) {
        try {
            web3.personal.unlockAccount(enviroment_1.ACCOUNT, enviroment_1.PASSWD, 0);
            exports.setAccountState(true);
            const event = contract.Deposit();
        }
        catch (e) {
            console.log(e);
            return;
        }
    }
    return contract;
});
exports.getEthOwner = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        return owner;
    }
    catch (err) {
        return err;
    }
});
exports.addEthHash = (hash, clientId, docId) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("(addETHHash) docId: " + docId + " clientId: " + clientId + " Hash: " + hash + ":");
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        const transactionId = yield contract.addHash(clientId, '0x' + hash, docId, { from: enviroment_1.ACCOUNT, gas: 200000 });
        console.log("(addETHHash) transactionId : " + transactionId);
        return transactionId;
    }
    catch (err) {
        return err;
    }
});
exports.verifyEthHash = (hash, clientId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        console.log("(verifyETHHash) owner -> " + clientId + " : " + hash);
        // console.log("size : "+ await contract.hashsize(clientId));
        return yield contract.Verify(clientId, hash, { from: enviroment_1.ACCOUNT, gas: 200000 });
    }
    catch (err) {
        return err;
    }
});
exports.getEthHash = (clientId, docId) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("(getETHHash) przyjalem parametry -> " + clientId + " : " + docId);
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        console.log("(getETHHash) owner -> " + owner);
        let hash = yield contract.getHash(clientId, docId, { from: enviroment_1.ACCOUNT, gas: 200000 });
        console.log("(getETHHash) hash -> " + hash);
        return hash;
    }
    catch (err) {
        console.log("(getETHHash) err -> " + err);
        return 'err';
    }
});
exports.getEthLastBlock = () => __awaiter(this, void 0, void 0, function* () {
    const web3 = yield new Web3(new Web3.providers.HttpProvider(enviroment_1.HTTP_PROVIDER));
    const res = yield web3.eth.getBlock('latest');
    return res;
});
exports.deactivateEthDoc = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        yield contract.deactivate({ from: enviroment_1.ACCOUNT, gas: 200000 });
        return 1;
    }
    catch (err) {
        return err;
    }
});
exports.activateEthDoc = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let contract = yield exports.getEthConnection();
        const owner = yield contract.owner();
        yield contract.activate({ from: enviroment_1.ACCOUNT, gas: 200000 });
        return 1;
    }
    catch (err) {
        return err;
    }
});
exports.getStateEthDoc = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let contract = yield exports.getEthConnection();
        let state = yield contract.state();
        return state;
    }
    catch (err) {
        return err;
    }
});
exports.getEthHistory = (hash) => __awaiter(this, void 0, void 0, function* () {
    const web3 = yield new Web3(new Web3.providers.HttpProvider(enviroment_1.HTTP_PROVIDER));
    console.log(hash);
    const res = yield web3.eth.getTransaction(hash);
    console.log(res);
    return res;
});
//# sourceMappingURL=documents_sol.js.map