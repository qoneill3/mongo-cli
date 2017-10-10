// app.js

var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurants_db";

function editDoc(name, collection) {
    var obj = [];
    console.log("Are you adding any properties?");
    var choice = prompt("y/n    ");
    var choice = prompt("y/n : ");
    console.log("How many?");
    let num = prompt();
    if (choice == 'y'){
        let set = { $set: {}};
        for (let i = 0; i <num; i++) {
              let key = prompt("key: ");
              let value = prompt("value: ");
              set.$set[key] = value;
          }
          collection.update({"name": name},set);
          console.log(name = " updated.");
  }
  else {
        collection.find({"name": name}).toArray((err, body) => {
            let set = body[0];
            for (let i = 0; i <num; i++) {
                  let key = prompt("key: ");
                  let value = prompt("value: ");
                  set[key] = value;
            }
            collection.update({"name": name},set);
            console.log(name + "updated.");
        });
  }
}

function commands(collection) {
    console.log("Type 'alla' and press enter to display all restaurants' names.");
    console.log("Type \<name\> to view a specific restaurant.");
    console.log("Enter 'new' to create a new restaurant.");
    console.log("Enter 'edit to edit a restaurant.");
    console.log("Enter 'del' to remove a restaurant.");
    var allChoice = prompt();
    if(allChoice == "all") {
      collection.find().toArray(function(err, doc) {
        console.log(doc);
      });
      console.log();
    }
    else if (allChoice == 'new'){
        var name = prompt("Enter a name:");
        var street = prompt("Enter a street:");
        var zip = prompt("Enter a zipcode:");
        var yelp = prompt("Enter a yelp:");
        collection.insert({"name": name,"address": {"street": street,"zipcode" : Number(zip)},"yelp": yelp});
        console.log("Added new restaurant:");
        collection.find({name: name}).toArray(function(err, doc){
          console.log(doc);
        });
        console.log();
    }
    else if (allChoice == 'edit'){
          var doc = prompt("Enter name of document you wish to update: ");
          editDoc(doc, collection);
    }
    else if (allChoice == 'del'){
          console.log("Enter name of restaurant you wish to delete.");
          var docu = prompt();
          collection.remove({name: docu});
          console.log("Document removed.\n");
    }
    else {
        collection.find({name: allChoice}).toArray(function(err, doc){
          console.log(doc);
        });
    }
}

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  commands(collection);
});



