import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInformation() {
  return (
    <div className="col-span-1">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="bg-secondary rounded-full p-3">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground mt-1">+91 8778525311</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="bg-secondary rounded-full p-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground mt-1">info@aurawear.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="bg-secondary rounded-full p-3">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground mt-1">
                  1234 Fashion Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="bg-secondary rounded-full p-3">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Hours</h3>
                <div className="text-muted-foreground mt-1">
                  <p>Monday - Saturday: 9AM - 7PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
