import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";

actor {
  type Message = {
    name : Text;
    brandName : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let messages = Map.empty<Int, Message>();

  public shared ({ caller }) func submitContactForm(name : Text, brandName : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let newMessage : Message = {
      name;
      brandName;
      email;
      message;
      timestamp;
    };
    messages.add(timestamp, newMessage);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray();
  };
};
