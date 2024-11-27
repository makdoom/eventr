import { getUserSession } from "../lib/hooks";

const DashboardPage = async () => {
  const session = await getUserSession();
  console.log(session);

  return <div>DashboardPage</div>;
};
export default DashboardPage;
