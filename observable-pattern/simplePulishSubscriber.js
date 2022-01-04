class Webinar {
  participants = [];
  subscribe(theParticipant) {
    // check for duplicacy
    this.participants.push(theParticipant);
  }

  unsubscribe(theParticipant) {
    this.participants = this.participants.filter(
      (p) => p.id != theParticipant.id
    );
  }

  execute(eventDetails) {
    for (const participant of this.participants) {
      if (participant.hasPaid) {
        participant.Handler(eventDetails);
      } else {
        participant.Error(
          "You are not eligble to attend this webinar as fees not paid !"
        );
      }
    }
  }
}

class Participant {
  constructor(id, name, hasPaid) {
    this.id = id;
    this.name = name;
    this.hasPaid = hasPaid;
  }

  Handler(e) {
    console.log(`Welcome ${this.name} ! ${e}`);
  }
  Error(e) {
    console.log(`Hey ${this.name} ! ${e}`);
  }
}

var p1 = new Participant(1, "Amit", true);
var p2 = new Participant(2, "Ankit", true);
var p3 = new Participant(3, "Aniket", false);

var jsWebinar = new Webinar();
jsWebinar.subscribe(p1);
jsWebinar.subscribe(p2);
jsWebinar.subscribe(p3);
//   jsWebinar.unsubscribe(p2);

// execute !
jsWebinar.execute("This is a javascript webinar !");
