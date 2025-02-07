"use client"
import { useState } from 'react'
import AuthWarp from '@/components/AuthWraper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BaseApiUrl } from '@/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const LoginPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true)

    // Create a new FormData object
    const formData = new FormData(e.target);

    // Access the form data using FormData's get method
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch(`${BaseApiUrl}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      })
      const json = await response.json()

      if (json.data) {
        console.log(json)
        toast.success("Login Successful")
        localStorage.setItem('token', json.data.token)
        if (json.data.role ==="company") {
          
          router.push("/admin")
        }else{
          router.push("/dashboard")

        }
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* <Toaster /> */}
      <section className="flex justify-center items-center h-screen">
        <AuthWarp
          title="Login to your account"
          description="Welcome back, to your account"
        >
          <form onSubmit={handlesubmit} className="my-4">
            <div className="flex flex-col space-y-2 my-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col space-y-2 my-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
          <div className="">
            <p className="text-center my-5">Don't Have Account? <Link href={"/signup"} className="underline">Sign up</Link></p>
          </div>
        </AuthWarp>
      </section>
    </>
  )
}

export default LoginPage
