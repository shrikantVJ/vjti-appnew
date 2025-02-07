'use client'

import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast'
import { BaseApiUrl } from '@/utils/constants'

import { useRouter } from 'next/navigation'


export default function OTPForm() {

  
    const router = useRouter()
  
  const [otp, setOtp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp.length === 6) {



      const response = await fetch(`${BaseApiUrl}/api/user/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userotp: otp })
    });
    const json = await response.json();

    if (json.message) {
        

        const response2 = await fetch(`${BaseApiUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: json.data.userObject.userName, secret: 'secret', email: json.data.userObject.email, first_name: json.firstname, last_name: json.lastname, })
        });
        const json2 = await response2.json();

        localStorage.setItem('token', json.data.token)
        router.push("/dashboard")
    } else {
        toast.error("Error to Create");
    }






      // Here you would typically send the OTP to your server for verification
      console.log('Submitting OTP:', otp)
      toast({
        title: "OTP Submitted",
        description: `Your OTP ${otp} has been submitted successfully.`,
      })
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit OTP.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Enter OTP</h2>
          <p className="text-muted-foreground">Please enter the 6-digit code sent to your device.</p>
        </div>
        <div className='flex justify-center'>

        <InputOTP
          value={otp}
          onChange={setOtp}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </div>
        <Button type="submit" className="w-full">Verify OTP</Button>
      </form>
      <Toaster />
    </div>
  )
}

