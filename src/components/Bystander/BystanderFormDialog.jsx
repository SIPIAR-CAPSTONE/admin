import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "../ui/separator";
import { DatePickerInput } from "../ui/DatePickerInput";



export default function BystanderFormDialog({
  open,
  setOpen,
  defaultValues,
  title,
  onSubmit,
  loading,
  formSchema,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { role } = useAuth();
  if (role !== "verifier") return null;


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:min-w-[750px] dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 grid-cols-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="firstName"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="middleName" className="min-w-max">
                        Middle Name
                      </Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="middleName"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="lastName"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suffix"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="suffix">Suffix</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="suffix"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="birthday">Birthday</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <DatePickerInput
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone #</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            id="phoneNumber"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <div className="grid gap-4 grid-cols-3">
                <FormField
                  control={form.control}
                  name="barangay"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="barangay">Barangay</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="barangay"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="street">Street</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="street"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="houseNumber"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="houseNumber">House #</Label>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            id="houseNumber"
                            className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>
              {defaultValues.hasOwnProperty("email") && (
                <>
                  <Separator className="mt-12 mb-4" />
                  <div className="grid gap-4 grid-cols-2 mb-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                type="email"
                                id="email"
                                className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                disabled={loading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                disabled={loading}
                                {...field}
                              />
                            </FormControl>
                            {showPassword ? (
                              <Eye
                                className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-4 right-2.5"
                                role="button"
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <EyeOff
                                className="absolute top-0.5 text-neutral-300 dark:text-neutral-600 size-4 right-2.5"
                                role="button"
                                onClick={() => setShowPassword(true)}
                              />
                            )}
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 cursor-pointer dark:bg-green-600 dark:hover:bg-green-500"
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
