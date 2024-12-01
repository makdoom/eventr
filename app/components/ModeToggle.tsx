"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [value, setValue] = React.useState(false);

  const handleChange = (value: boolean) => {
    setTheme(value ? "dark" : "light");
    setValue(value);
  };

  React.useEffect(() => {
    setValue(theme == "dark" ? true : false);
  }, [theme]);

  return <Switch checked={value} onCheckedChange={handleChange} />;
}
