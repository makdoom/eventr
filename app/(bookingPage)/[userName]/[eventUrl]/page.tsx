import { getBookingDetails } from "@/app/actions/bookingForm.actions";
import RenderCalendar from "@/app/components/bookingForm/RenderCalendar";
import TimeTable from "@/app/components/bookingForm/TimeTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Video } from "lucide-react";

const BookingForm = async ({
  params,
  searchParams,
}: {
  params: Promise<{ userName: string; eventUrl: string }>;
  searchParams: { date?: string };
}) => {
  const { userName, eventUrl } = await params;
  const data = await getBookingDetails(userName, eventUrl);
  console.log(data?.User?.availabilitySchedule);
  const selectedDate = searchParams?.date
    ? new Date(searchParams.date)
    : new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(selectedDate);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1200px] w-full mx-auto bg-secondary/40 h-[520px]">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
          <div>
            <div className="flex gap-2 items-center">
              <Avatar className="size-8">
                {data?.User?.image && (
                  <AvatarImage
                    src={data?.User?.image}
                    alt="user profile"
                    className="size-8"
                  />
                )}
                <AvatarFallback className="bg-primary-foreground">
                  {data?.User?.name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <p className="text-muted-foreground text-sm font-medium">
                {data?.User?.name}
              </p>
            </div>

            <div className="mt-12 flex flex-col">
              <h1 className="text-2xl font-semibold">{data?.title}</h1>
              <p className="my-2 text-muted-foreground text-sm">
                {data?.description}
              </p>

              <div className="mt-6 flex flex-col gap-2">
                <div className="inline-flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formattedDate}
                  </span>
                </div>

                <div className="inline-flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {data?.duration} minutes
                  </span>
                </div>

                <div className="inline-flex items-center">
                  <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {data?.videoCallSoftware}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-muted"
          />

          {data?.User?.availabilitySchedule && (
            <RenderCalendar
              availability={data?.User?.availabilitySchedule[0]}
            />
          )}

          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-muted"
          />

          {data?.User?.availabilitySchedule && (
            <TimeTable
              selectedDate={selectedDate}
              availability={data?.User?.availabilitySchedule[0]}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default BookingForm;
