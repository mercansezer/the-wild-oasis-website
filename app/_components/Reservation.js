import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const session = await auth();

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="border border-primary-800 flex">
      <div className="flex-shrink-0">
        <DateSelector
          settings={settings}
          cabin={cabin}
          bookedDates={bookedDates}
        />
      </div>
      <div className="flex-1">
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session?.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;
