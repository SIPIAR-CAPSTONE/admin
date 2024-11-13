import { Hash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
import { Link, useNavigate } from 'react-router-dom'
import supabase from '@/supabase/config'
import { useEffect, useRef, useState } from 'react'
import useSendToken from '@/hooks/useSendToken'
import useBoundStore from '@/zustand/useBoundStore'
import useCountdown from '@/hooks/useCountdown'

const formSchema = z.object({
  token: z.string().min(1, { message: 'Token hash is required' }),
})

export default function TokenVerificationPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
    },
  })

  const [isFilled, setIsFilled] = useState(false)
  const hasCalledProcess = useRef(true)
  const passwordResetEmail = useBoundStore((state) => state.passwordResetEmail)
  const { process } = useSendToken(passwordResetEmail, false)
  const { time, pause } = useCountdown(70) //* it should be 70 constant, this is for interval in supabase
  const [token, setToken] = useState('')

  /*
   * if the countdown sets to 0, call the process for sending the token again
   * 0 is rendered twice, so it needs a useRef hook to determine if it's already performed
   */
  if (time === 0 && hasCalledProcess.current) {
    process()
    hasCalledProcess.current = false
  }

  /*
   * listen to token Field changes
   * if inputted token is equals or greater than 56, then remove the disabled state of verify button
   */
  useEffect(() => {
    if (token.length >= 56) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [token])

  async function onSubmit() {
    // TODO:
    /**
     ** - Loading UI Button (same sa mobile na naay circular indicator for loading)
     ** - Error UI (especially for showing server errors)
     ** - Resent Countdown UI (See mobile implementation for reference)
     */

    if (isFilled) {
      // setLoading(true)

      //* verify provied token
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      })
      // .finally(() => setLoading(false))

      if (error) {
        // setServerError(error);
      } else if (!error) {
        navigate('/reset-password')
        pause() //* call the pause function to stop the countdown
      }
    }
  }

  return (
    <div className="grid min-h-screen place-content-center dark:bg-neutral-900">
      <Card className="w-80 dark:bg-neutral-800">
        <CardHeader>
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
                  <FormItem className="relative mb-4">
                    <Hash className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Token hash"
                        className="h-10 pl-8 dark:border-neutral-700"
                        {...field}
                        value={token} // Bind input value to state
                        onChange={(e) => {
                          setToken(e.target.value)
                          field.onChange(e) // Update form state with email
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-white"
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
  )
}
