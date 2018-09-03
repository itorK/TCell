pragma solidity ^0.4.0;

contract Documents {

    address public owner;

    enum State {
    Inactive,
    Active
    }

    struct Hash {
    bytes32 hash;
    uint32 clientId;
    bool flag;
    uint timestamp;
    }

    struct Clients {
    uint32 clientId;
    mapping (uint32 => Hash) hash;
    uint32[] docsId;
    }

    struct History {
    mapping (uint32 => bytes32) hash;
    uint32[] docsId;
    }

    event Deposit(
    address indexed _from,
    bytes32 indexed documentHash,
    bytes32 hash
    );

    mapping (uint32 => Clients) clients;
    State public state;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier contractActive() {
        require(state == State.Active);
        _;
    }

    function Documents() public {
        owner = msg.sender;
        state = State.Active;
    }

    function hashsize(uint32 clientId) public returns (uint) {
        return clients[clientId].docsId.length;
    }

    function Verify(uint32 clientId,uint32 docId, bytes32 documentHash) public view returns (bool) {

        if(clients[clientId].hash[docId].hash == documentHash ) {
            return true;
        }
        else{
            return false;
        }

       // for (uint i = 0; i <  clients[clientId].docsId.length; i++) {
        //    var docId = clients[clientId].docsId[i];
        //    if (documentHash == clients[clientId].hash[docId]) {
         //       return true;
         //   }
       // }
       // return false;
    }


    function deactivate() public onlyOwner() {
        state = State.Inactive;
    }

    function activate() public onlyOwner() {
        state = State.Active;
    }

    function getHash(uint32 clientId, uint32 docId ) public constant contractActive() returns(bytes32) {
        return clients[clientId].hash[docId].hash;
    }

    function getTimestamp(uint32 clientId, uint32 docId ) public constant contractActive() returns(uint) {
        return clients[clientId].hash[docId].timestamp;
    }

    function getHistory(uint32 clientId, uint32 docId ) public constant contractActive() returns(bytes32) {
        return clients[clientId].hash[docId].hash;
    }
    function addHash(uint32 clientId, bytes32 documentHash, uint32 docId) public onlyOwner() contractActive() {
        clients[clientId].hash[docId].hash = documentHash;
        clients[clientId].hash[docId].timestamp = now;
       // clients[clientId].docsId.push(docId);
        Deposit(msg.sender, documentHash, clients[clientId].hash[docId].hash);
    }

    function changeOwner(address _newOwner) public onlyOwner() {
        owner = _newOwner;
    }

}
