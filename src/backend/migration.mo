import Map "mo:core/Map";
import Nat "mo:core/Nat";

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
    mileage : ?Text;
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
    nextBikeId : Nat;
    inquiries : Map.Map<Nat, Inquiry>;
    nextInquiryId : Nat;
  };

  type NewActor = {
    bikes : Map.Map<Nat, Bike>;
    nextBikeId : Nat;
    inquiries : Map.Map<Nat, Inquiry>;
    nextInquiryId : Nat;
    seeded : Bool;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      seeded = false;
    };
  };
};
