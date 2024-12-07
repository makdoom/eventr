import { getUserEvents } from "../actions/events.action";
import EventLists from "../components/EventLists";
import EventsHeader from "../components/EventsHeader";

const DashboardPage = async () => {
  const userEvents = await getUserEvents();

  return (
    <div className="container">
      <EventsHeader />
      <div className="mt-8 h-[calc(100vh-110px)] no-scrollbar">
        {userEvents?.events.length && (
          <EventLists
            userName={userEvents.username as string}
            events={userEvents.events}
          />
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
