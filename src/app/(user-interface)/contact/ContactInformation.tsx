import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SUPPORT_EMAIL, WHATSAPP_PHONE } from "@/lib/constants";

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
                <a
                  href={`tel:+${WHATSAPP_PHONE}`}
                  className="text-muted-foreground hover:text-primary mt-1 block transition-colors"
                  aria-label={`Call us at ${WHATSAPP_PHONE}`}
                >
                  ${WHATSAPP_PHONE}
                </a>
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
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-muted-foreground hover:text-primary mt-1 block transition-colors"
                  aria-label="Send us an email at info@aurawear.com"
                >
                  {SUPPORT_EMAIL}
                </a>
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
                  No. 108/1, 3 Meenakshi avenue,
                  <br />
                  Jaswanth nagar,
                  <br />
                  Mogappair west,
                  <br />
                  Chennai - 600037
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
