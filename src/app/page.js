"use client"
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import emailjs from '@emailjs/browser';

export default function Home() {
  const form = useRef(null); 

  const sendEmail = (e) => {
    e.preventDefault(); 

    if (!form.current) return;

    emailjs
      .sendForm('service_2m4lite', 'template_kfr0kme', form.current, {
        publicKey: 'DvllqdJh4GYXvsETM',
      })
      .then(
        () => {
          e.target.reset();
          alert("E-mail sent");
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl">Book an appointment</h1>

      <Card className="w-[450px] mt-7">
        <CardHeader>
          <CardTitle>Book an appointment to meet Pranav Jain</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={form} onSubmit={sendEmail}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="user_name" placeholder="Enter your name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Select name="user_subject">
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Discussion">Discussion</SelectItem>
                    <SelectItem value="Meet and Greet">Meet and Greet</SelectItem>
                    <SelectItem value="Gedi marna">Gedi marna</SelectItem>
                    <SelectItem value="Gym">Gym</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="user_description" placeholder="Specify in detail" required />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="reset">Cancel</Button>
              <Button type="submit">Book</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
