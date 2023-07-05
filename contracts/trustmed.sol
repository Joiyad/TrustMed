// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Identify{
    // address of owner
    address owner;

    // various details related to medicine from which unique code will be generated
    // data types are strictly defined for low deployment cost
    // brand, model no., description, manufacturer details, retailer, customer
    struct medicineObj{
        uint status;
        string brand;
        string model;
        string description;
        string manufName;
        string manufLocation;
        string manufTimestamp;
        address owner;
        address[] customers;
    }

    // details of customers
    struct customerObj{
        address customerAddress;
        string name;
        string phone;
        string[] code;
        bool isPresent;
    }

    // details of retailer
    struct retailerObj{
        address retailerAddress;
        string name;
        string location;
    }

    // mapping 
    mapping (string => medicineObj) medicines;
    mapping (address => customerObj) customers;
    mapping (address => retailerObj) retailers;

    // function for creating unique code for each object
    function generateCode(string memory _code, uint _status, string memory _brand, string memory _model, string memory _description, string memory _manufName, string memory _manufLocation, string memory _manufTimestamp) public payable returns(uint){
        medicineObj memory medicine;
        medicine.status = _status;
        medicine.brand = _brand;
        medicine.model = _model;
        medicine.description = _description;
        medicine.manufName = _manufName;
        medicine.manufLocation = _manufLocation;
        medicine.manufTimestamp = _manufTimestamp;
        medicine.owner = msg.sender;
        medicines[_code] = medicine;
        initialOwner(_code);
        return 1;
    }

    // function for showing medicine details if the person scanning is not owner
    function getDetailsNotOwner(string memory _code) public view returns(uint, string memory, string memory, string memory, string memory, string memory, string memory){
        return (medicines[_code].status, medicines[_code].brand, medicines[_code].model, medicines[_code].description, medicines[_code].manufName, medicines[_code].manufLocation, medicines[_code].manufTimestamp);
    }

    // // function for showing medicine details if the person scanning is owner
    function getDetailsOwner(string memory _code) public view returns(address, string memory, string memory){
        return (medicines[_code].owner, retailers[medicines[_code].owner].name, retailers[medicines[_code].owner].location);
    }

    // // function for creating a new retailer
    function addRetailerToCode(string memory _code, address _address) public payable returns(uint) {
        medicines[_code].owner = _address;
        return 1;
    }

    // // function for creating a new customer
    function createCustomer(address _address, string memory _name, string memory _phone) public payable returns(bool){
        if(customers[_address].isPresent){
            return false;
        }

        customerObj memory customer;
        customer.name = _name;
        customer.phone = _phone;
        customer.isPresent = true;
        customers[_address] = customer;
        return true;
    }

    // function for getting customer details, here code is email
    function getCustomerDetails(address _address) public view returns(string memory, string memory){
        return (customers[_address].name, customers[_address].phone);
    }

    // function for creating a retailer  
    function createRetailer(address _retailerAddress, string memory _name, string memory _location) public payable returns(uint){
        retailerObj memory retailer;
        retailer.retailerAddress = _retailerAddress;
        retailer.name = _name;
        retailer.location = _location;
        retailers[_retailerAddress] = retailer;
        return 1;
    }

    // function for getting retailer details, here code is address
    function getRetailerDetails(address _address) public view returns(string memory, string memory){
        return (retailers[_address].name, retailers[_address].location);
    }

    // only owner can transfer ownership
    modifier onlyOwner(string memory _code){
        require(medicines[_code].owner == msg.sender, "Only owner can tranfer ownership");
        _;
    }

    // function for transferring ownership
    function transferOwnership(string memory _code, address _newOwner) public payable returns(uint) {
        medicines[_code].owner = _newOwner;
        return 1;
    }

    // function for initial owner
    function initialOwner(string memory _code) public payable returns(bool) {
        medicines[_code].owner = msg.sender;
        return true;
    }
}