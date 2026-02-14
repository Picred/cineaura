import { MOCK_FILMS, MOCK_SCHEDULE } from "./mockData";

type Listener = (...args: any[]) => void;

class MockSocket {
  id = "mock-socket-id";
  connected = false;
  private listeners: { [event: string]: Listener[] } = {};

  constructor() {
    setTimeout(() => {
      this.connected = true;
      this.emitInternal("connect");
    }, 500);
  }

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return this;
  }

  off(event: string, listener: Listener) {
    if (!this.listeners[event]) return this;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    return this;
  }

  private emitInternal(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(l => l(...args));
    }
  }

  emit(event: string, ...args: any[]) {
    const callback = typeof args[args.length - 1] === "function" ? args.pop() : null;

    // console.log(`[MockSocket] Event: ${event}`, args);

    setTimeout(() => {
      switch (event) {
        case "getAllFilms":
          if (callback) callback({ success: true, films: this.getFilms() });
          break;
        case "getSchedule":
          if (callback) callback({ success: true, schedule: this.getSchedule() });
          break;
        case "getTickets":
          if (callback) callback({ success: true, tickets: this.getTickets() });
          break;
        case "addTicket":
          this.addTicket(args[0]);
          if (callback) callback({ success: true });
          this.emitInternal("update");
          break;
        case "getFilmById":
          const film = this.getFilms().find((f: any) => f.id === args[0]);
          if (callback) callback({ success: true, film });
          break;
        case "addFilm":
          this.addFilm(args[0]);
          if (callback) callback({ success: true });
          this.emitInternal("update");
          break;
        case "deleteFilm":
          this.deleteFilm(args[0]);
          this.emitInternal("update");
          this.emitInternal("updateTickets");
          break;
        default:
          // console.warn(`[MockSocket] Unhandled event: ${event}`);
          break;
      }
    }, 100);

    return this;
  }

  private getFilms() {
    const stored = localStorage.getItem("cineaura_demo_films");
    return stored ? JSON.parse(stored) : MOCK_FILMS;
  }

  private addFilm(film: any) {
    const films = this.getFilms();
    films.push({ ...film, id: Date.now() });
    localStorage.setItem("cineaura_demo_films", JSON.stringify(films));
  }

  private deleteFilm(id: number) {
    const films = this.getFilms().filter((f: any) => f.id !== id);
    localStorage.setItem("cineaura_demo_films", JSON.stringify(films));
  }

  private getSchedule() {
    return MOCK_SCHEDULE;
  }

  private getTickets() {
    return JSON.parse(localStorage.getItem("cineaura_demo_tickets") || "[]");
  }

  private addTicket(ticket: any) {
    const allTickets = this.getTickets();
    allTickets.push({ ...ticket, id: Date.now() });
    localStorage.setItem("cineaura_demo_tickets", JSON.stringify(allTickets));
  }
}

export const mockSocket = new MockSocket() as any;
