import { AtSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import useBoundStore from "@/zustand/useBoundStore";
import supabase from "@/supabase/config";
import useSendToken from "@/hooks/useSendToken";
import ServerError from "@/components/ui/ServerError";
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
});

export default function ForgotPasswordPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = form.getValues().email;

  const setResetEmail = useBoundStore((state) => state.setPasswordResetEmail);
  const [loading, setLoading] = useState(false);
  const {
    error: serverError,
    setError: setServerError,
    process: sendTokenToEmail,
  } = useSendToken(email, true);

  async function onSubmit(values) {
    try {
      // Add email as a global prop
      setResetEmail(values.email);
      setLoading(true);

      const { data } = await supabase
        .from("admin")
        .select()
        .eq("email", values.email);

      // Check if data is an array and has at least one element
      if (Array.isArray(data) && data.length > 0) {
        sendTokenToEmail();
      } else {
        setServerError("Account not found");
      }
    } catch (error) {
      setServerError(`Server Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-content-center dark:bg-neutral-900">
      <Card className="w-80 dark:bg-neutral-800">
        <CardHeader>
          <h1 className="text-xl font-semibold">Forgot Password</h1>
          <p className="text-sm text-neutral-500">
            Please provide your email address.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <ServerError error={serverError} />
              <Button
                type="submit"
                size="lg"
                className="w-full mt-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
                disabled={loading}
              >
                Send Code
              </Button>
              <Button
                variant="link"
                className="w-full font-normal text-neutral-500"
                asChild
              >
                <Link to="/login">Back to Login</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
