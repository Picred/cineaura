import { socket } from "../utils/socket";

export const addTicket = async (ticketData: {
  user_id: number;
  film_id: number;
  schedule_id: number;
  seat_number?: number;
  price: number;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("addTicket", ticketData, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(new Error(response.message || "Failed to add ticket"));
      }
    });
  });
};
