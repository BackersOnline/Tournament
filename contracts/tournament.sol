pragma solidity ^0.4.18;

/* 
	Tourname Solidity contract. 
	It creates a Tournament with a fixed umber of participants and distributes Prizes at the end
*/	

// The contract definition. A constructor of the same name will be automatically called on contract creation.
contract Tournament {
    address organizer;      // Address of the Tournament organizer - public?
    string title;          // Tournament title 
    uint entries;           // Actual number of participants
    uint maxParticipants;   // Maximum number of participants
    uint entryFee;          // Tournament fee
    uint surcharge;         // Charge for entering
    uint prizePool;         // Total pool of prizes
    bool started;           // Tournament stages
    bool finished;
    bool ended;             // Tournament finished and prizes awarded


    // Participant record
    struct Participant {
        string name;   // short name 
        uint fee;   // entree fee paid
    }
    
    mapping(address => Participant) public participants;    // Participant information
    address[] public participantAddresses;  // Enumerate participants by address

    // Modifies a function so it only executes if the sender is the organizer
    modifier onlyOrganizer {
        if (msg.sender == organizer) {
            _;
        }
    } 
    
    // The constructor accepts a string input and saves it to the contract's "greeting" variable.
    function Tournament(string _title, uint32 _maxParticipants, uint _entryFee, uint _surcharge) public {
        organizer = msg.sender;
        title = _title;
        maxParticipants = _maxParticipants; // for now, no minimum number
        entryFee = _entryFee;
        surcharge = _surcharge;
        entries = 0;
        prizePool = 0;
        started = false;
        finished = false;
        ended = false;
    }

    function tournamentTitle() public constant returns (string) {
        return title;
    }
    
    // Returns the prize pool amount to calculate winning percentages outside the contract
    function tournamentPrizePool() public view returns (uint) {
        return prizePool;
    }
    
    // Enter Tournament, before it started, up to a maximum number of participants, once per address, with a correct fee
    function enterTournament(string _name) public payable {
        address e = msg.sender;

    /// Organizer allowed to enter? (msg.sender == organizer)
        require(!started && !ended && (msg.value == entryFee));
        require(entries<=maxParticipants);
        require(participants[e].fee == 0); // did not pay (enter) yet
        participants[e].fee = msg.value;
        participants[e].name = _name;
        participantAddresses.push(e);
        prizePool = prizePool + msg.value - surcharge;
    }
    
    function startTournament() public onlyOrganizer {
        require(!ended);
        started = true;
    }

    function finishTournament() public onlyOrganizer {
        finished = true;
    }
    
    function endTournament() public onlyOrganizer {
        finished = true;
        ended = true;
    }

    /// Unwind the Tournament. Control over the surcharge in such an event 
    function returnFees(uint _surcharge) public onlyOrganizer {
        endTournament();
        prizePool = 0;
        /// enumerate participants and send each their entryFee
        /// length better be equal to entries
        for (uint i = 0; i < participantAddresses.length; i++) {
            address p;
            p = participantAddresses[i];

            // actual paid participant
            if (participants[p].fee == entryFee) {
                p.transfer(entryFee - _surcharge);    
            }
        }
    }

    function increasePrize() public payable onlyOrganizer {
        require(!ended);
        prizePool = prizePool + msg.value;
    }
    
    function awardPrize(address first, address second, address third, uint firstPrize, uint secondPrize, uint thirdPrize) public onlyOrganizer {
        require(participants[first].fee == entryFee); // actual paid participant
        require(participants[second].fee == entryFee);
        require(participants[third].fee == entryFee);
        endTournament();
        first.transfer(firstPrize);
        second.transfer(secondPrize);
        third.transfer(thirdPrize);    
    }

    
     /**********
     Standard kill() function to recover funds 
     **********/
    
    function kill() public onlyOrganizer { 
        selfdestruct(organizer);       // kills this contract and sends remaining funds back to creator
    }

}

contract CreateTournament {
    address[] newTournaments;

    event TournamentAddress (
        address tourny,
        address organizer
    ); 

    function createNewTournament(string _title, uint32 _maxParticipants, uint _entryFee, uint _surcharge) public {
        address newTournament = new Tournament(_title, _maxParticipants, _entryFee, _surcharge);
        newTournaments.push(newTournament);
        TournamentAddress(newTournament, msg.sender);
    }

    function checkAddress(address tournament) public view returns(bool) {
        bool exists = false;

        for (uint i = 0; i < newTournaments.length; i++) {
            if (tournament == newTournaments[i]) {
                exists = true;
            }
        }

        return exists;
    }

}
