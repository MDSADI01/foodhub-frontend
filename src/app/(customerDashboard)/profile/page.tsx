import { customerService } from "@/app/services/customer.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

const CustomerProfile = () => {
  const editProfile = async (formData: FormData) => {
    "use server";

    const image = formData.get("image") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;

    const profileData = {
      image,
      address,
      phone,
    };

    const res = await customerService.updateProfile(profileData);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit you profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="edit-profile" action={editProfile}>
            <FieldGroup>
              <Field>
                <FieldLabel>Profile Picture</FieldLabel>
                <Input type="text" placeholder="Image URL" name="image"></Input>
              </Field>

              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input type="text" placeholder="Address" name="address"></Input>
              </Field>

              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                ></Input>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="edit-profile" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerProfile;
