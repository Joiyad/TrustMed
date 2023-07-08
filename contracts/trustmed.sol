// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Trustmed{
    // address of owner
    address superAdmin;

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

    // mapping 
    mapping (string => medicineObj) medicines;
    mapping (address => retailerObj) retailers;
    mapping (address => manufacturerObj) manufacturers;

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
        manufacturerObj memory manufacturer;
        manufacturer.manufacturerAddress = _manufacturerAddress;
        manufacturer.name = _name;
        manufacturer.location = _location;
        manufacturers[_manufacturerAddress] = manufacturer;
        return true;
    }

    // function for checking superAdmin
    function isSuperAdmin() external view returns(bool){
        if(superAdmin == msg.sender) return true;
        return false;
    }

    // function for finding superAdmin
    function getSuperAdmin() external view returns(address){
        return superAdmin;
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
        medicines[_code].allOwners.push(_address);
        return 1;
    }

    // function for creating a retailer  
    function createRetailer(address _retailerAddress, string memory _name, string memory _location) public payable returns(bool){
        if(retailers[_retailerAddress].isPresent){
            return false;
        }
        
        retailerObj memory retailer;
        retailer.retailerAddress = _retailerAddress;
        retailer.name = _name;
        retailer.location = _location;
        retailer.isPresent = true;
        retailers[_retailerAddress] = retailer;
        return true;
    }

    // function for getting retailer details, here code is address
    function getRetailerDetails(address _address) public view returns(string memory, string memory){
        return (retailers[_address].name, retailers[_address].location);
    }

    // function for transferring ownership
    function transferOwnership(string memory _code, address _newOwner) public payable returns(uint) {
        if(medicines[_code].owner == msg.sender){
            medicines[_code].owner = _newOwner;
            return 1;
        }
        return 0;
    }

    // function for initial owner
    function initialOwner(string memory _code) public payable returns(bool) {
        medicines[_code].owner = msg.sender;
        return true;
    }
}