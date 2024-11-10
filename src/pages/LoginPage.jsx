import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AppLogo from "@/components/Sidebar/AppLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="grid min-h-screen place-content-center dark:bg-neutral-900">
      <Card className="w-80 dark:bg-neutral-800">
        <CardHeader>
          <AppLogo />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <AtSign className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="h-10 pl-8 dark:border-neutral-700"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Lock className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="h-10 pl-8 dark:border-neutral-700"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <Eye
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2.5">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
