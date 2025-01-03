import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import supabase from "@/supabase/config";
import { useToast } from "@/hooks/use-toast";
import ServerError from "@/components/ui/ServerError";
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

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must not exceed 50 characters" }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must not exceed 50 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function onSubmit(values) {
    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (error) {
        setServerError(error.message);
      } else if (!error) {
        toast({
          title: "Success",
          description: "Password updated successfully",
        });
        navigate("/login");
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
        <CardHeader>
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <p className="text-sm text-neutral-500">
            Set your new password for your account.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Lock className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="New Password"
                        type={showPassword.newPassword ? "text" : "password"}
                        className="h-10 pl-8 dark:border-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    {showPassword.newPassword ? (
                      <Eye
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() =>
                          setShowPassword((prevShowPass) => {
                            return {
                              ...prevShowPass,
                              newPassword: false,
                            };
                          })
                        }
                      />
                    ) : (
                      <EyeOff
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() =>
                          setShowPassword((prevShowPass) => {
                            return {
                              ...prevShowPass,
                              newPassword: true,
                            };
                          })
                        }
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Lock className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Confirm New Password"
                        type={
                          showPassword.confirmNewPassword ? "text" : "password"
                        }
                        className="h-10 pl-8 dark:border-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    {showPassword.confirmNewPassword ? (
                      <Eye
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() =>
                          setShowPassword((prevShowPass) => {
                            return {
                              ...prevShowPass,
                              confirmNewPassword: false,
                            };
                          })
                        }
                      />
                    ) : (
                      <EyeOff
                        className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-5 right-2.5"
                        role="button"
                        onClick={() =>
                          setShowPassword((prevShowPass) => {
                            return {
                              ...prevShowPass,
                              confirmNewPassword: true,
                            };
                          })
                        }
                      />
                    )}
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
                Verify
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
