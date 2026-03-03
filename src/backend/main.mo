import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

import Iter "mo:core/Iter";


actor {
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
    mileage : ?Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    bikeId : Nat;
    message : Text;
  };

  module Bike {
    public func compareByPrice(bike1 : Bike, bike2 : Bike) : Order.Order {
      Nat.compare(bike1.price, bike2.price);
    };
  };

  // Simulated persistent storage with Maps for bikes starting with our 20 initial bikes
  stable var bikes : Map.Map<Nat, Bike> = Map.fromIter<Nat, Bike>([
    (
      1,
      {
        id = 1;
        name = "KTM Duke 390";
        brand = "KTM";
        category = "Naked Sports Bikes";
        price = 310_000;
        photos = [];
        engine = ? "373cc";
        weight = ?168;
        frame = ? "Steel trellis frame";
        colorOptions = ["Orange", "White"];
        description = "The KTM Duke 390 is a lightweight naked sports bike, perfect for street riding with aggressive styling.";
        mileage = ? "28 km/l";
      },
    ),
    (
      2,
      {
        id = 2;
        name = "Triumph Speed 400";
        brand = "Triumph";
        category = "Naked Sports Bikes";
        price = 233_000;
        photos = [];
        engine = ? "398cc";
        weight = ?176;
        frame = ? "Tubular steel frame";
        colorOptions = ["Red", "Jet Black"];
        description = "The Triumph Speed 400 offers a British performance motorcycle experience in a stylish naked sports package.";
        mileage = ? "30 km/l";
      },
    ),
    (
      3,
      {
        id = 3;
        name = "Royal Enfield Classic 350";
        brand = "Royal Enfield";
        category = "Commuter Bikes";
        price = 195_000;
        photos = [];
        engine = ? "349cc";
        weight = ?195;
        frame = ? "Twin downtube spine frame";
        colorOptions = ["Red", "Blue", "Chrome"];
        description = "The Royal Enfield Classic 350 pays tribute to the brand's legacy with vintage cruiser styling and reliable commuting.";
        mileage = ? "35 km/l";
      },
    ),
    (
      4,
      {
        id = 4;
        name = "Honda CBR 650R";
        brand = "Honda";
        category = "Sports Bikes";
        price = 935_000;
        photos = [];
        engine = ? "649cc";
        weight = ?208;
        frame = ? "Diamond frame";
        colorOptions = ["Red", "Black"];
        description = "The Honda CBR 650R is a super-sport machine built for the track and everyday road use.";
        mileage = ? "25 km/l";
      },
    ),
    (
      5,
      {
        id = 5;
        name = "TVS Apache RTR 160";
        brand = "TVS";
        category = "Commuter Bikes";
        price = 125_000;
        photos = [];
        engine = ? "159cc";
        weight = ?140;
        frame = ? "Double cradle frame";
        colorOptions = ["Red", "White"];
        description = "The TVS Apache RTR 160 is a nimble commuter with reliable performance for daily city rides.";
        mileage = ? "45 km/l";
      },
    ),
    (
      6,
      {
        id = 6;
        name = "Bajaj Pulsar NS200";
        brand = "Bajaj";
        category = "Naked Sports Bikes";
        price = 150_000;
        photos = [];
        engine = ? "199cc";
        weight = ?156;
        frame = ? "Perimeter frame";
        colorOptions = ["Red", "White", "Black"];
        description = "The Bajaj Pulsar NS200 combines awesome power with an agile naked sports bike chassis.";
        mileage = ? "36 km/l";
      },
    ),
    (
      7,
      {
        id = 7;
        name = "Hero Xpulse 200";
        brand = "Hero";
        category = "Adventure Bikes";
        price = 160_000;
        photos = [];
        engine = ? "199cc";
        weight = ?157;
        frame = ? "Diamond frame";
        colorOptions = ["White", "Red"];
        description = "The Hero Xpulse 200 is built for adventure with dual-sport capabilities and trail readiness.";
        mileage = ? "40 km/l";
      },
    ),
    (
      8,
      {
        id = 8;
        name = "Suzuki Gixxer SF";
        brand = "Suzuki";
        category = "Sports Bikes";
        price = 140_000;
        photos = [];
        engine = ? "155cc";
        weight = ?148;
        frame = ? "Diamond frame";
        colorOptions = ["Red", "Blue"];
        description = "The Suzuki Gixxer SF delivers sporty styling and reliable performance for everyday motorcycle enthusiasts.";
        mileage = ? "45 km/l";
      },
    ),
    (
      9,
      {
        id = 9;
        name = "Kawasaki Ninja 300";
        brand = "Kawasaki";
        category = "Sports Bikes";
        price = 343_000;
        photos = [];
        engine = ? "296cc";
        weight = ?179;
        frame = ? "Steel tube diamond frame";
        colorOptions = ["Black", "Green"];
        description = "The Kawasaki Ninja 300 brings iconic supersport performance to entry-level riders seeking high performance.";
        mileage = ? "30 km/l";
      },
    ),
    (
      10,
      {
        id = 10;
        name = "BMW G 310 R";
        brand = "BMW";
        category = "Naked Sports Bikes";
        price = 290_000;
        photos = [];
        engine = ? "313cc";
        weight = ?158;
        frame = ? "Tubular steel frame";
        colorOptions = ["Red", "White"];
        description = "The BMW G 310 R is a premium lightweight naked sports bike with athletic German engineering.";
        mileage = ? "32 km/l";
      },
    ),
    (
      11,
      {
        id = 11;
        name = "Honda Hornet 2.0";
        brand = "Honda";
        category = "Naked Sports Bikes";
        price = 139_000;
        photos = [];
        engine = ? "184cc";
        weight = ?142;
        frame = ? "Diamond type frame";
        colorOptions = ["Red", "Blue"];
        description = "The Honda Hornet 2.0 packs power and agility in a lightweight frame.";
        mileage = ? "42 km/l";
      },
    ),
    (
      12,
      {
        id = 12;
        name = "TVS Raider 125";
        brand = "TVS";
        category = "Commuter Bikes";
        price = 95_000;
        photos = [];
        engine = ? "124cc";
        weight = ?130;
        frame = ? "Tubular frame";
        colorOptions = ["Red", "Blue"];
        description = "The TVS Raider 125 provides an awesome daily commuter experience with high fuel efficiency.";
        mileage = ? "60 km/l";
      },
    ),
    (
      13,
      {
        id = 13;
        name = "Bajaj Dominar 400";
        brand = "Bajaj";
        category = "Adventure Bikes";
        price = 225_000;
        photos = [];
        engine = ? "373cc";
        weight = ?187;
        frame = ? "Perimeter frame";
        colorOptions = ["Red", "Black"];
        description = "The Bajaj Dominar 400 is a high-performance touring machine built for adventure and comfort.";
        mileage = ? "27 km/l";
      },
    ),
    (
      14,
      {
        id = 14;
        name = "Royal Enfield Meteor 350";
        brand = "Royal Enfield";
        category = "Commuter Bikes";
        price = 205_000;
        photos = [];
        engine = ? "349cc";
        weight = ?191;
        frame = ? "Steel tube frame";
        colorOptions = ["Red", "Black"];
        description = "The Royal Enfield Meteor 350 merges classic cruiser styling with modern reliability for daily rides.";
        mileage = ? "35 km/l";
      },
    ),
    (
      15,
      {
        id = 15;
        name = "KTM RC 200";
        brand = "KTM";
        category = "Sports Bikes";
        price = 218_000;
        photos = [];
        engine = ? "199cc";
        weight = ?160;
        frame = ? "Steel trellis frame";
        colorOptions = ["Orange", "White"];
        description = "The KTM RC 200 is a race-inspired sports bike engineered for high-speed performance.";
        mileage = ? "35 km/l";
      },
    ),
    (
      16,
      {
        id = 16;
        name = "Suzuki Hayabusa";
        brand = "Suzuki";
        category = "Sports Bikes";
        price = 1_640_000;
        photos = [];
        engine = ? "1340cc";
        weight = ?264;
        frame = ? "Twin spar frame";
        colorOptions = ["Red", "Blue"];
        description = "The Suzuki Hayabusa is a legendary high-speed sports motorcycle and the fastest bike on the planet.";
        mileage = ? "18 km/l";
      },
    ),
    (
      17,
      {
        id = 17;
        name = "Kawasaki Z900";
        brand = "Kawasaki";
        category = "Naked Sports Bikes";
        price = 920_000;
        photos = [];
        engine = ? "948cc";
        weight = ?210;
        frame = ? "Trellis frame";
        colorOptions = ["Green", "Black"];
        description = "The Kawasaki Z900 blends high power with outstanding naked sports bike agility and control.";
        mileage = ? "17 km/l";
      },
    ),
    (
      18,
      {
        id = 18;
        name = "Hero Splendor Plus";
        brand = "Hero";
        category = "Commuter Bikes";
        price = 75_000;
        photos = [];
        engine = ? "97cc";
        weight = ?110;
        frame = ? "Cradle frame";
        colorOptions = ["Red", "Black"];
        description = "The Hero Splendor Plus delivers dependable and highly fuel-efficient commuting for everyday needs.";
        mileage = ? "70 km/l";
      },
    ),
    (
      19,
      {
        id = 19;
        name = "Yamaha MT-15";
        brand = "Yamaha";
        category = "Naked Sports Bikes";
        price = 168_000;
        photos = [];
        engine = ? "155cc";
        weight = ?138;
        frame = ? "Delta box frame";
        colorOptions = ["Blue", "Black"];
        description = "The Yamaha MT-15 is an agile and lightweight naked sports bike with signature Yamaha performance.";
        mileage = ? "45 km/l";
      },
    ),
    (
      20,
      {
        id = 20;
        name = "BMW S 1000 RR";
        brand = "BMW";
        category = "Sports Bikes";
        price = 2_025_000;
        photos = [];
        engine = ? "999cc";
        weight = ?197;
        frame = ? "Aluminum composite frame";
        colorOptions = ["Red", "Black"];
        description = "The BMW S 1000 RR is a superbike offering unmatched power and precision German racing engineering.";
        mileage = ? "15 km/l";
      },
    ),
  ].values());

  stable var nextBikeId = 21; // 20 seeded bikes

  // Starting with an empty persistent inquiries map
  stable var inquiries = Map.empty<Nat, Inquiry>();
  stable var nextInquiryId = 0;

  stable var seeded = true;

  /// Returns all bikes sorted by price from lowest to highest.
  public query ({ caller }) func getAllBikes() : async [Bike] {
    bikes.values().toArray().sort(Bike.compareByPrice);
  };

  /// Retrieves a single bike by its unique ID. Traps if the ID does not exist!
  public query ({ caller }) func getBike(id : Nat) : async Bike {
    switch (bikes.get(id)) {
      case (null) {
        Runtime.trap("Bike with id " # id.toText() # " not found. ");
      };
      case (?bike) {
        bike;
      };
    };
  };

  /// Adds a new bike to the catalog. Returns the new bike's unique ID.
  public shared ({ caller }) func addBike(
    name : Text,
    brand : Text,
    category : Text,
    price : Nat,
    photos : [Text],
    engine : ?Text,
    weight : ?Nat,
    frame : ?Text,
    colorOptions : [Text],
    description : Text,
    mileage : ?Text,
  ) : async () {
    let bike : Bike = {
      id = nextBikeId;
      name;
      brand;
      category;
      price;
      photos;
      engine;
      weight;
      frame;
      colorOptions;
      description;
      mileage;
    };
    bikes.add(nextBikeId, bike);
    nextBikeId += 1;
  };

  /// Returns all submitted inquiries.
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  /// Submits a new inquiry for a specific bike.
  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    phone : Text,
    bikeId : Nat,
    message : Text,
  ) : async () {
    switch (bikes.get(bikeId)) {
      case (null) {
        Runtime.trap("Bike ID " # bikeId.toText() # " is invalid.");
      };
      case (?_) {
        let inquiry : Inquiry = {
          name;
          email;
          phone;
          bikeId;
          message;
        };
        inquiries.add(nextInquiryId, inquiry);
        nextInquiryId += 1;
      };
    };
  };
};
