import { getUserEvents } from "../actions/events.action";
import EventsHeader from "../components/EventsHeader";

const DashboardPage = async () => {
  const userEvents = await getUserEvents();
  console.log(userEvents);

  return (
    <div className="container">
      <EventsHeader />
      {/* <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div> */}
    </div>
  );
};
export default DashboardPage;
