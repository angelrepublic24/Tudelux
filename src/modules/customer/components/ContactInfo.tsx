import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";

export const CustomerContactInfo = ({ contact }) => {
    console.log(contact);
  const user = contact;

  if (!user) {
    return (
      <Card className="text-sm text-muted-foreground p-4">
        <CardContent>No contact information available.</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-primary">Client Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="font-semibold text-gray-700">Name</p>
          <p>{user?.name} {user?.lName}</p>
        </div>
        <Separator />
        <div>
          <p className="font-semibold text-gray-700">Email</p>
          <p>{user?.email}</p>
        </div>
        <Separator />
        <div>
          <p className="font-semibold text-gray-700">Phone</p>
          <p>{formatPhoneNumber(user?.phone)}</p>
        </div>
        {user?.company && (
          <>
            <Separator />
            <div>
              <p className="font-semibold text-gray-700">Company</p>
              <p>{user.company}</p>
            </div>
          </>
        )}
        {user?.address_street && (
          <>
            <Separator />
            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <p>{user.address_street}</p>
            </div>
          </>
        )}
        {user?.address_city && (
          <>
            <Separator />
            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <p>{user.address_city}</p>
            </div>
          </>
        )}
        {user?.address_state && (
          <>
            <Separator />
            <div>
              <p className="font-semibold text-gray-700">State</p>
              <p>{user.address_state}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
