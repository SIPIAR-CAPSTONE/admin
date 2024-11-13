import { AtSign } from 'lucide-react'
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
import { Link } from 'react-router-dom'
import useBoundStore from '@/zustand/useBoundStore'
import supabase from '@/supabase/config'
import useSendToken from '@/hooks/useSendToken'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email(),
})

export default function ForgotPasswordPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const setResetEmail = useBoundStore((state) => state.setPasswordResetEmail)
  const [email, setEmail] = useState('')

  //! Create Error UI & use this "errors" value below
  const { errors, setErrors, process } = useSendToken(email, true)

  async function onSubmit(values) {
    // TODO:
    /**
     ** - Form Validation
     ** - Loading UI Button (same sa mobile na naay circular indicator for loading)
     ** - Error UI (especially for showing server errors)
     */

    // Add email as a global prop
    setResetEmail(values.email)

    // if (isFormValid(fields, form, setErrors)) {
    //   setLoading(true)
      try {
        const { data } = await supabase
          .from('admin')
          .select()
          .eq('email', values.email)

        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          process() // Call the process function from the useSendToken hook for sending token to the provided email
        } else {
          let errors = {}
          errors.email = 'Account not found.'
          setErrors(errors)
        }
      } catch (error) {
        const errorMessage = { email: `Server Error: ${error.message}` }
        setErrors(errorMessage)
      } finally {
        // setLoading(false)
      }
    // }
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
                  <FormItem className="relative mb-4">
                    <AtSign className="absolute size-4 top-3 left-2.5 text-neutral-400" />
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="h-10 pl-8 dark:border-neutral-700"
                        autoComplete="email"
                        {...field}
                        value={email} // Bind input value to state
                        onChange={(e) => {
                          setEmail(e.target.value)
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
  )
}
