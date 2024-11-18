import { Hash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/supabase/config";
import { useRef, useState } from "react";
import useSendToken from "@/hooks/useSendToken";
import useBoundStore from "@/zustand/useBoundStore";
import useCountdown from "@/hooks/useCountdown";
import ServerError from "@/components/ui/ServerError";
import ResendCountdown from "@/components/ui/ResendCountdown";

const formSchema = z.object({
  token: z.string().min(56, { message: "Invalid Token" }),
});

export default function TokenVerificationPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });
  const token = form.getValues().token;

  const hasCalledProcess = useRef(true);
  const passwordResetEmail = useBoundStore((state) => state.passwordResetEmail);
  const { process: sendTokenToEmail } = useSendToken(passwordResetEmail, false);
  const { time: countdownTimer, pause: pauseCountDown } = useCountdown(70); //* it should be 70 constant, this is for interval in supabase
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /*
   * if the countdown sets to 0, call the process for sending the token again
   * 0 is rendered twice, so it needs a useRef hook to determine if it's already performed
   */
  if (countdownTimer === 0 && hasCalledProcess.current) {
    sendTokenToEmail();
    hasCalledProcess.current = false;
  }

  async function onSubmit() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });

      if (error) {
        setServerError(error.message);
      } else if (!error) {
        navigate("/reset-password");
        pauseCountDown();
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-content-center dark:bg-neutral-900">
      <Card className="w-80 dark:bg-neutral-800">
        <CardHeader className="pb-3">
          <h1 className="text-xl font-semibold">Enter Code</h1>
          <p className="text-sm text-neutral-500">
            We have sent the verification code to your email address.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Hash className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Token hash"
                        className="h-10 pl-8 dark:border-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ResendCountdown time={countdownTimer} />
              <ServerError error={serverError} />
              <Button
                type="submit"
                size="lg"
                className="w-full mt-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
                disabled={loading}
              >
                Verify
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
