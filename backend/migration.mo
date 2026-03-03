import Map "mo:core/Map";

module {
  type Bike = {
    id : Nat;
    name : Text;
    brand : Text;
    category : Text;
    price : Nat;
    photos : [Text];
    engine : ?Text;
    weight : ?Nat;
    frame : ?Text;
    colorOptions : [Text];
    description : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    bikeId : Nat;
    message : Text;
  };

  type OldActor = {
    bikes : Map.Map<Nat, Bike>;
    inquiries : Map.Map<Nat, Inquiry>;
    nextBikeId : Nat;
    nextInquiryId : Nat;
  };

  type NewActor = {
    bikes : Map.Map<Nat, Bike>;
    inquiries : Map.Map<Nat, Inquiry>;
    nextBikeId : Nat;
    nextInquiryId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    if (old.bikes.isEmpty()) {
      let seededBikes = Map.fromIter<Nat, Bike>([
        (
          0,
          {
            id = 0;
            name = "Yamaha R15";
            brand = "Yamaha";
            category = "Sports";
            price = 180000;
            photos = ["https://images.unsplash.com/photo-1609630875171-b1321377ee65"];
            engine = ? "155cc";
            weight = null;
            frame = null;
            colorOptions = ["Blue", "Red", "Black"];
            description = "The Yamaha R15 is a lightweight sports bike with a powerful 155cc engine, perfect for city and highway rides.";
          },
        ),
        (
          1,
          {
            id = 1;
            name = "KTM Duke 390";
            brand = "KTM";
            category = "Naked";
            price = 310000;
            photos = ["https://images.unsplash.com/photo-1617814076668-7d9f5bff031f"];
            engine = ? "373cc";
            weight = null;
            frame = null;
            colorOptions = ["Orange", "Black", "White"];
            description = "The KTM Duke 390 is a high-performance naked bike with a 373cc engine, offering excellent handling and agility.";
          },
        ),
        (
          2,
          {
            id = 2;
            name = "Royal Enfield Classic 350";
            brand = "Royal Enfield";
            category = "Cruiser";
            price = 195000;
            photos = ["https://images.unsplash.com/photo-1597008858255-6c1b16ef5b24"];
            engine = ? "349cc";
            weight = null;
            frame = null;
            colorOptions = ["Black", "Silver", "Red"];
            description = "The Royal Enfield Classic 350 is a cruiser bike with a 349cc engine, known for its classic styling and comfortable ride.";
          },
        ),
      ].values());
      {
        bikes = seededBikes;
        inquiries = old.inquiries;
        nextBikeId = 3;
        nextInquiryId = 0;
      };
    } else {
      old;
    };
  };
};
