import { socket } from "../../utils/socket";
import { ScheduleType } from "../../types/ScheduleType";
import { formatIsoDate } from "../../utils/isoDate";

export const ScheduleTable = ({ schedule }: { schedule: ScheduleType[] }) => {
  const deleteSchedule = (scheduleId: number) => {
    socket.emit("deleteSchedule", scheduleId);
  };

  const isScheduleArray = Array.isArray(schedule);

  return (
    <div className="overflow-x-auto max-h-screen flex-grow">
      <table className="table bg-base-300 min-w-full">
        <thead>
          <tr>
            <th className="p-2">Film Title</th>
            <th className="p-2">Datetime</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {isScheduleArray && schedule.length > 0 ? (
            schedule.map((item: ScheduleType, index: number) => (
              <tr key={item.id}>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <div className="font-bold">
                        [{item.id}] {item.film_title}
                      </div>
                      <div className="text-sm opacity-50">{item.capacity}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">{formatIsoDate(item.schedule_datetime)}</td>
                <td className="p-2 gap-1 flex">
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => deleteSchedule(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-2 text-center">
                No schedules available
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Release year</th>
            <th className="p-2">Duration</th>
            <th className="p-2"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
