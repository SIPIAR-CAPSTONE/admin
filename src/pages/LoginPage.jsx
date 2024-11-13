import { AtSign, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import AppLogo from '@/components/Sidebar/AppLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider'

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password must not exceed 50 characters' }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    // TODO:
    /**
     ** - Form Validation
     ** - Loading UI Button (same sa mobile na naay circular indicator for loading)
     ** - Error UI (especially for showing server errors)
     */
    try {
      // if (isFormValid(fields, { email, password }, setErrors)) {
      //   setLoading(true)
        const { error } = await login(values.email, values.password)
        if (error) {
          let errors = {};
          errors.password = error.message;
          // setErrors(errors);
        } else {
          navigate('/')
        }
      // }
    } finally {
      // setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-content-center dark:bg-neutral-900">
      <Card className="w-80 dark:bg-neutral-800">
        <CardHeader>
          <AppLogo />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative mb-4">
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
                        type={showPassword ? 'text' : 'password'}
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
              <div className="flex justify-end">
                <Button
                  variant="link"
                  className="p-0 mb-3 text-neutral-500"
                  asChild
                >
                  <Link to="/forgot-password">Forgot Password</Link>
                </Button>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
              >
                Login
              </Button>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className="w-full mt-2 text-sm text-neutral-400 underline">
                  Login Credentials Disclaimer
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    For Authorized Personnel Only. Account credentials are
                    provided by the office and are strictly for authorized
                    users.
                  </p>
                </TooltipContent>
              </Tooltip>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
