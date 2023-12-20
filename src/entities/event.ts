export class Event {
    public static clone(event: Event): Event {
        return new Event(event.id, event.name, event.date, event.location, event.attendees, event.description);
    }
    id: number;
    name: string;
    date: Date;
    location: string;
    attendees: string[]; //zmeniť na users
    description?: string;


    constructor(id: number, name: string, date: Date, location: string, attendees: string[], description?: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.attendees = attendees;
        this.description = description;
    }
}

export default Event;
