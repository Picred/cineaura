import { create } from "zustand";

interface NowPlayingStore {
  filmTitle: string;
  filmImg: string;
  filmDuration: number; // Duration in minutes
  startTime: number | null;
  reset: () => void;
  add: (
    title: string,
    img: string,
    duration: number,
    startTime: number
  ) => void;
  getProgress: () => number;
}
export const nowPlayingStore = create<NowPlayingStore>((set, get) => ({
  filmTitle: "",
  filmImg:
    "https://images.unsplash.com/photo-1517486518908-97a5f91b325f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  filmDuration: 0,
  startTime: null,
  reset: () => {
    localStorage.removeItem("nowPlaying");
    set({
      filmTitle: "",
      filmImg:
        "https://images.unsplash.com/photo-1517486518908-97a5f91b325f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filmDuration: 0,
      startTime: null,
    });
  },
  add: (title, img, duration, startTime) => {
    const state = {
      filmTitle: title,
      filmImg: img,
      filmDuration: duration,
      startTime,
    };
    localStorage.setItem("nowPlaying", JSON.stringify(state));
    set(state);
  },
  getProgress: () => {
    const { filmDuration, startTime } = get();
    if (!startTime) return 0;
    const now = Date.now();
    const durationInSeconds = filmDuration * 60;
    const elapsedSeconds = (now - startTime) / 1000;
    return Math.min(elapsedSeconds, durationInSeconds);
  },
}));

// Recupera lo stato dal localStorage al caricamento
const storedState = localStorage.getItem("nowPlaying");
if (storedState) {
  const { filmTitle, filmImg, filmDuration, startTime } =
    JSON.parse(storedState);
  nowPlayingStore.setState({ filmTitle, filmImg, filmDuration, startTime });
}
