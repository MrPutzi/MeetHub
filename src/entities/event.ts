// import { User } from "./user";
//
// export class Event {
//     // Remove the index signature
//     // [x: string]: Event;
//
//     public static clone(event: Event): Event {
//         return new Event(event.id, event.name, event.date, event.location, event.description);
//     }
//     id: number;
//     name: string;
//     date: Date;
//     location: string;
//     description?: string;
//
//
//     constructor(id: number, name: string, date: Date, location: string, description?: string) {
//         this.id = id;
//         this.name = name;
//         this.date = date;
//         this.location = location;
//         this.description = description;
//     }
//
//     getFormattedDate(): string {
//         return this.date.toLocaleDateString();
//     }
// }
//
// export default Event;
export class Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description?: string;

  constructor(id: number, name: string, date: Date, location: string, description?: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
  }

  public static clone(event: Event): Event {
    return new Event(event.id, event.name, event.date, event.location, event.description);
  }

  getFormattedDate(): string {
    return this.date.toLocaleDateString();
  }
}

export default Event;
