// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Trustmed{
    // address of owner
    address superAdmin;

    // various details related to medicine from which unique code will be generated
    // data types are strictly defined for low deployment cost
    // brand, model no., description, manufacturer details, retailer, customer
    struct productObj{
        uint status;
        string brand;
        string model;
        string description;
        string manufName;
        string manufLocation;
        string manufTimestamp;
        bool isPresent;
        address owner;
        address[] allOwners;
    }

    // details of retailer
    struct retailerObj{
        address retailerAddress;
        string name;
        string location;
        bool isPresent;
    }

    // details of manufacturer
    struct manufacturerObj{
        address manufacturerAddress;
        string name;
        string location;
        bool isPresent;
    }

    // requests for buy
    struct requestObj{
        address newOwner;
        string code;
    }

    // mapping 
    mapping (string => productObj) products;
    mapping (address => retailerObj) retailers;
    mapping (address => manufacturerObj) manufacturers;
    mapping (address => requestObj) requests;

    // construction for superadmin
    constructor(){
        superAdmin = msg.sender;
    }

    // modifier for manufacturers only
    modifier onlySuperAdmin(){
        require(manufacturers[msg.sender].manufacturerAddress == msg.sender, "only manufacturer can register product");
        _;
    }

    // function for registering manufacturer
    function createManufacturer(address _manufacturerAddress, string memory _name, string memory _location) public payable returns(bool){
        if(manufacturers[_manufacturerAddress].isPresent){
            return false;
        }
        manufacturerObj storage manufacturer = manufacturers[_manufacturerAddress] ;
        manufacturer.manufacturerAddress = _manufacturerAddress;
        manufacturer.name = _name;
        manufacturer.location = _location;
        return true;
    }

    // function for checking superAdmin
    function isSuperAdmin() external view returns(bool){
        if(superAdmin == msg.sender) return true;
        return false;
    }

    // function for checking manufacturer
    function isManufacturer() external view returns(bool){
        if(manufacturers[msg.sender].manufacturerAddress == msg.sender){
            return true;
        }
        else return false;
    }


    // function for identifying retailer
    function isRetailer() external view returns(bool){
        if(retailers[msg.sender].retailerAddress == msg.sender){
            return true;
        }
        else return false;
    }

    // function for registration of product
    function registerProduct(string memory _code, uint _status, string memory _brand, string memory _model, string memory _description, string memory _manufName, string memory _manufLocation, string memory _manufTimestamp) public payable returns(uint){
        productObj storage newProduct = products[_code];
        newProduct.brand = _brand;
        newProduct.status = _status;
        newProduct.model = _model;
        newProduct.description = _description;
        newProduct.manufName = _manufName;
        newProduct.manufLocation = _manufLocation;
        newProduct.manufTimestamp = _manufTimestamp;
        newProduct.owner = msg.sender;
        newProduct.isPresent = true;
        initialOwner(_code);
        return 1;
    }

    // check availability of product
    function isProduct(string memory _code) public view returns(bool){
        if(products[_code].isPresent == false) return false;
        return true;
    }

    // function for making request
    function makeRequest(string memory _code) public payable returns(bool){
        requestObj storage newRequest = requests[products[_code].owner];
        newRequest.code = _code;
        newRequest.newOwner = msg.sender;
        return true;
    }

    // function for getting request
    function getRequest() public view returns(string memory, string memory, address){
        return (requests[msg.sender].code, products[requests[msg.sender].code].brand, requests[msg.sender].newOwner);
    }

    // // function for accepting request
    function acceptRequest(string memory _code, address _newOwner) public payable returns(bool) {
        products[_code].owner = _newOwner;
        products[_code].allOwners.push(_newOwner);
        delete requests[msg.sender];
        return true;
    }

    // function for declining request
    function declineRequest() public payable returns(bool){
        delete requests[msg.sender];
        return true;
    }

    // function for showing medicine details if the person scanning is not owner
    function getDetailsNotOwner(string memory _code) public view returns(uint, string memory, string memory, string memory, string memory, string memory, string memory){
        return (products[_code].status, products[_code].brand, products[_code].model, products[_code].description, products[_code].manufName, products[_code].manufLocation, products[_code].manufTimestamp);
    }

    // // function for showing medicine details if the person scanning is owner
    function getDetailsOwner(string memory _code) public view returns(address, string memory, string memory){
        return (products[_code].owner, retailers[products[_code].owner].name, retailers[products[_code].owner].location);
    }

    // function for creating a retailer  
    function createRetailer(address _retailerAddress, string memory _name, string memory _location) public payable returns(bool){
        if(retailers[_retailerAddress].isPresent){
            return false;
        }
        
        retailerObj storage retailer = retailers[_retailerAddress];
        retailer.retailerAddress = _retailerAddress;
        retailer.name = _name;
        retailer.location = _location;
        retailer.isPresent = true;
        return true;
    }

    // function for getting retailer details, here code is address
    function getRetailerDetails(address _address) public view returns(string memory, string memory){
        return (retailers[_address].name, retailers[_address].location);
    }

    // function for transferring ownership
    function transferOwnership(string memory _code, address _newOwner) public payable returns(uint) {
        if(products[_code].owner == msg.sender){
            products[_code].owner = _newOwner;
            return 1;
        }
        return 0;
    }

    // function for initial owner
    function initialOwner(string memory _code) public payable returns(bool) {
        products[_code].owner = msg.sender;
        products[_code].allOwners.push(msg.sender);
        return true;
    }
}