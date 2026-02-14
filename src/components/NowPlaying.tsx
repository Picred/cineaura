import { useState, useEffect } from "react";
import { nowPlayingStore } from "../zustand/nowPlayingStore";

/**
 * NowPlaying component displays the currently playing film with a progress bar.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the film.
 * @param {string} props.img - The URL of the film's image.
 * @param {number} props.duration - The duration of the film in minutes.
 * @returns {JSX.Element} The rendered NowPlaying component.
 */
export const NowPlaying = ({
  title,
  img,
  duration,
}: {
  title: string;
  img: string;
  duration: number;
}): JSX.Element => {
  const { getProgress } = nowPlayingStore();
  const [progress, setProgress] = useState(0);

  /**
   * Initializes the progress state and sets up an interval to update the progress every second.
   * Clears the interval when the component unmounts or when the progress reaches the film's duration.
   *
   * Dependencies: [duration, getProgress]
   */
  useEffect(() => {
    const initialProgress = getProgress();
    setProgress(initialProgress);

    const interval = setInterval(() => {
      const currentProgress = getProgress();
      setProgress(currentProgress);

      if (currentProgress >= duration * 60) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
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
