import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Migration "migration";

(with migration = Migration.run)
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
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    bikeId : Nat;
    message : Text;
  };

  let bikes = Map.empty<Nat, Bike>();
  var nextBikeId = 3;

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 0;

  // Bike ordering by price
  module Bike {
    public func compareByPrice(bike1 : Bike, bike2 : Bike) : Order.Order {
      Nat.compare(bike1.price, bike2.price);
    };
  };

  // Add a bike (for admin use)
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
    };
    bikes.add(nextBikeId, bike);
    nextBikeId += 1;
  };

  // Get all bikes sorted by price
  public query ({ caller }) func getAllBikes() : async [Bike] {
    bikes.values().toArray().sort(Bike.compareByPrice);
  };

  // Get bike details by id
  public query ({ caller }) func getBike(id : Nat) : async Bike {
    switch (bikes.get(id)) {
      case (null) { Runtime.trap("Bike not found") };
      case (?bike) { bike };
    };
  };

  // Submit inquiry
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, bikeId : Nat, message : Text) : async () {
    switch (bikes.get(bikeId)) {
      case (null) { Runtime.trap("Bike not found") };
      case (?_) {
        let inquiry : Inquiry = { name; email; phone; bikeId; message };
        inquiries.add(nextInquiryId, inquiry);
        nextInquiryId += 1;
      };
    };
  };
};
