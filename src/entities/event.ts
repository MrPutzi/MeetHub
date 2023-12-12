class Event {
    id: number;
    name: string;
    date: Date;
    location: string;
    attendees: string[];

    constructor(id: number, name: string, date: Date, location: string, attendees: string[]) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.attendees = attendees;
    }
}

export default Event;
