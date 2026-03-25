import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
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
import { Textarea } from "./textarea";
import { adminService } from "@/app/services/adminService";
import { redirect } from "next/navigation";
import { providerService } from "@/app/services/providerService";

const ManageMealButton = async () => {
  const categoryData = await adminService.getAllCategories();
  const categories = categoryData?.data?.data;

  const createMeal = async (formData: FormData) => {
    "use server";

    const payload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        imageUrl: formData.get("imageUrl") as string,
        category: formData.get("category") as string,
      };
      console.log(payload);

    const res = await providerService.createMeal(payload)
    console.log(res);

if(res?.data){
    redirect("/provider/menu")
}
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Meal</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Meal</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new meal.
          </AlertDialogDescription>

          <div className="w-full  py-4">
            <div className="overflow-y-auto max-h-[60vh]">
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>Create Meal</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <form className="flex flex-col gap-4" id="create-meal" action={createMeal}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Meal Name</FieldLabel>
                        <Input required
                          type="text"
                          placeholder="Meal Name"
                          name="name"
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea
                          placeholder="Description"
                          name="description"
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Price</FieldLabel>
                        <Input required type="number" placeholder="Price" name="price" />
                      </Field>

                      <Field>
                        <FieldLabel>Image URL</FieldLabel>
                        <Input required
                          type="text"
                          placeholder="Image URL"
                          name="imageUrl"
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Category</FieldLabel>
                        <select
                          name="category"
                          className="w-full border rounded-md px-3 py-2 bg-background"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories?.map((cat: any) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </FieldGroup>
                  </form>
                </CardContent>

               
                  <Button
                    form="create-meal"
                    type="submit"
                    className="w-3/4 flex mx-auto"
                  >
                    Submit
                  </Button>
            
              </Card>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ManageMealButton;
