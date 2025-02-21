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
    <div className="flex flex-col items-center min-h-screen p-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 flex items-center justify-center">
            <Terminal className="mr-2 h-6 w-6" />
            Meeting Scheduler
          </h1>
        </header>

        <Card className="w-full border-0 shadow-lg bg-white dark:bg-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-700 to-blue-700 dark:from-teal-800 dark:to-blue-900 text-white rounded-t-lg">
            <CardTitle className="text-xl font-medium flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Schedule with Pranav Jain
            </CardTitle>
            <CardDescription className="text-slate-100">Book your time</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="user_name" placeholder="Enter your full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="user_email" type="email" placeholder="your.email@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Meeting Type</Label>
                  <Select name="user_subject" required onValueChange={setMeetingType}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Architecture Review">Architecture Review</SelectItem>
                      <SelectItem value="Code Review">Code Review</SelectItem>
                      <SelectItem value="System Design">System Design</SelectItem>
                      <SelectItem value="Technical Mentorship">Technical Mentorship</SelectItem>
                      <SelectItem value="Project Consultation">Project Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <input type="hidden" name="user_date" value={date ? date.toISOString().split('T')[0] : ""} />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-[280px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Technical Details</Label>
                  <Textarea id="description" name="user_description" placeholder="Describe your technical requirements or discussion points" required />
                </div>
              </div>

              {formStatus === "success" && (
                <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-md text-sm border-l-4 border-teal-500">
                  Meeting request successfully scheduled
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md text-sm border-l-4 border-red-500">
                  Request failed. Check console for details.
                </div>
              )}

              <CardFooter className="px-0 pt-4 flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" type="reset">
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium">
                  {isSubmitting ? "Processing..." : "Schedule Meeting"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>❤️❤️</p>
        </footer>
      </div>
    </div>
  );
}
