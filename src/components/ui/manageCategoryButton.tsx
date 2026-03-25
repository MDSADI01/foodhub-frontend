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

const ManageCategoryButton = () => {
  const createCategory = async (formData: FormData) => {
    "use server";

    const name = formData.get("category-name") as string;
    const description = formData.get("description") as string;

    const categoryData = {
      name,
      description,
    };

   const res = await adminService.createCategories(categoryData);
   console.log(res);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Category</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new category.
          </AlertDialogDescription>

          <div className="w-full py-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <form id="create-category" action={createCategory}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Category Name</FieldLabel>
                        <Input
                          type="text"
                          placeholder="Name of Category"
                          name="category-name"
                        ></Input>
                      </Field>

                      <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea
                          placeholder="description"
                          name="description"
                        ></Textarea>
                      </Field>
                    </FieldGroup>
                  </form>
                </CardContent>

                <AlertDialogAction asChild>
                  <Button
                    form="create-category"
                    type="submit"
                    className="w-3/4 flex mx-auto"
                  >
                    Submit
                  </Button>
                </AlertDialogAction>
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

export default ManageCategoryButton;
