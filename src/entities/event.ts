class Event {
    public static clone(event: Event): Event {
        return new Event(event.id, event.name, event.date, event.location, event.attendees);
    }
    id: number;
    name: string;
    date: Date;
    location: string;
    attendees: string[]; //zmeniť na users

    constructor(id: number, name: string, date: Date, location: string, attendees: string[]) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.attendees = attendees;
    }
}

export default Event;
