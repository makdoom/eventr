"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import GoogleCalendar from "@/public/googleCalendar.svg";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const GrantPermission = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Connect your calendar
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground !mt-4">
            Connect your calendar to automatically check for busy times and new
            events as they&apos;re scheduled
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="flex items-center gap-4">
            <Image
              src={GoogleCalendar}
              alt="google-calendar"
              className="size-10"
            />
            <h2 className="flex-1">Google Calendar</h2>
            <Switch disabled checked />
          </div>

          <Button className="w-full mt-10">
            <Link href="/api/auth" className="flex items-center gap-2">
              Connect
              <MoveRight className="" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default GrantPermission;
