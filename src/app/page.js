"use client";
import * as React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Code, Terminal } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Home() {
  const form = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [date, setDate] = useState(null);
  const [meetingType, setMeetingType] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm("service_2m4lite", "template_kfr0kme", form.current, {
        publicKey: "DvllqdJh4GYXvsETM",
      })
      .then(
        () => {
          e.target.reset();
          setDate(null);
          setMeetingType("");
          setFormStatus("success");
          setIsSubmitting(false);
          setTimeout(() => setFormStatus(null), 3000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setFormStatus("error");
          setIsSubmitting(false);
          setTimeout(() => setFormStatus(null), 3000);
        }
      );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Terminal className="mr-2 h-6 w-6" />
             Meeting Scheduler
          </h1>
        </header>

        <Card className="w-full border-0 shadow-lg bg-white dark:bg-zinc-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700 text-white rounded-t-lg">
            <CardTitle className="text-xl font-medium flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Schedule with Pranav Jain
            </CardTitle>
            <CardDescription className="text-zinc-100">Select a time to collaborate</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Name
                  </Label>
                  <Input 
                    id="name" 
                    name="user_name" 
                    placeholder="Enter your full name" 
                    required 
                    className="border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-zinc-700/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    name="user_email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    className="border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-zinc-700/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Meeting Type
                  </Label>
                  <Select name="user_subject" required onValueChange={setMeetingType} value={meetingType}>
                    <SelectTrigger 
                      id="subject"
                      className="border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-zinc-700/50"
                    >
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                      <SelectItem value="Meet and Greet">Meet and Greet</SelectItem>
                      <SelectItem value="Kaam ki baat">Kaam ki baat</SelectItem>
                      <SelectItem value="Gedi marna">Gedi marna</SelectItem>
                      <SelectItem value="Gym">Gym</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Date
                  </Label>
                  <input type="hidden" name="user_date" value={date ? date.toISOString().split('T')[0] : ""} />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full font-normal border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
                          !date && "text-zinc-500 dark:text-zinc-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" align="start">
                      <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={setDate} 
                        initialFocus 
                        className="rounded-md border-zinc-200 dark:border-zinc-700"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Details
                  </Label>
                  <Textarea 
                    id="description" 
                    name="user_description" 
                    placeholder="Describe what you'd like to discuss" 
                    required 
                    className="min-h-24 border-zinc-300 dark:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-zinc-700/50"
                  />
                </div>
              </div>

              {formStatus === "success" && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-md text-sm border-l-4 border-emerald-500 flex items-start">
                  <svg className="w-5 h-5 mr-2 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Meeting request successfully scheduled</span>
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md text-sm border-l-4 border-red-500 flex items-start">
                  <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>Request failed. Please try again.</span>
                </div>
              )}

              <CardFooter className="px-0 pt-4 flex flex-col sm:flex-row gap-3 justify-between sm:justify-end">
                <Button 
                  variant="outline" 
                  type="reset"
                  onClick={() => {
                    setDate(null);
                    setMeetingType("");
                  }}
                  className="w-full sm:w-auto border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !date}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Schedule Meeting"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>❤️❤️</p>
        </footer>
      </div>
    </div>
  );
}