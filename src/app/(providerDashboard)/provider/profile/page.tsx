import { customerService } from "@/app/services/customer.service";
import { providerService } from "@/app/services/providerService";
import { redirect } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const ProviderProfile = () => {
  const createProviderProfile = async (formData: FormData) => {
    "use server";

    const image = formData.get("image") as string;
    const restaurantName = formData.get("restaurantName") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;

    const profileData = {
      image,
      address,
      phone,
      restaurantName,
      description,
    };
    const userData = {
      image,
      address,
      phone,
    };
    const userRes = await customerService.updateProfile(userData);

    const res = await providerService.createProviderProfile(profileData);
    
    redirect("/provider/menu");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Provider profile </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="create-profile" action={createProviderProfile}>
            <FieldGroup>
              <Field>
                <FieldLabel>Profile Picture</FieldLabel>
                <Input type="text" placeholder="Image URL" name="image"></Input>
              </Field>

              <Field>
                <FieldLabel>Restaurant Name </FieldLabel>
                <Input
                  type="text"
                  placeholder="Restaurant Name"
                  name="restaurantName"
                  required
                ></Input>
              </Field>

              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input type="text" placeholder="Address" name="address"></Input>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  placeholder="Description"
                  name="description"
                ></Textarea>
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
          <Button form="create-profile" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProviderProfile;
