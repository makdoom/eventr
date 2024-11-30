import SettingForm from "@/app/components/SettingForm";
import prisma from "@/app/lib/db";
import { getUserSession } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      email: true,
      image: true,
      name: true,
      about: true,
    },
  });

  if (!data) return notFound();

  return data;
};

const Settings = async () => {
  const session = await getUserSession();
  const data = await getUserData(session?.user?.id as string);

  return (
    <SettingForm
      email={data.email}
      name={data.name as string}
      image={data.image as string}
      username={data.username as string}
      about={data.about as string}
    />
  );
};
export default Settings;
