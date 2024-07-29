import { useState, useEffect } from "react";
import { nowPlayingStore } from "../zustand/nowPlayingStore";
import { filmStore } from "../zustand/filmStore";
import { useStore } from "zustand";
export const NowPlaying = ({
  title,
  img,
  duration,
}: {
  title: string;
  img: string;
  duration: number;
}) => {
  const { getProgress } = nowPlayingStore();
  const [progress, setProgress] = useState(0);
  const films = useStore(filmStore);

  useEffect(() => {
    const initialProgress = getProgress();
    setProgress(initialProgress);

    const interval = setInterval(() => {
      const currentProgress = getProgress();
      setProgress(currentProgress);

      if (currentProgress >= duration * 60) {
        clearInterval(interval);
      }
    }, 1000); // Update progress every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [duration, getProgress]);

  return (
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
        <h2 className="text-white text-xl mb-2">{title}</h2>
        <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
            style={{ width: `${(progress / (duration * 60)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
