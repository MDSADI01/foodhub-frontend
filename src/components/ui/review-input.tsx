import { env } from "@/env";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { userService } from "@/app/services/user.service";
import { reviewService } from "@/app/services/review.service";


interface ReviewInputProps {
  mealId: string;
}


const API_URL = env.API_URL;

const ReviewInput = async ({ mealId }: ReviewInputProps) => {

  const { data } = await userService.getSession()

 const customerId = data?.user?.id as string;

  async function submitReview(formData: FormData) {
    "use server"; 

    const comment = formData.get("comment") as string;
    const rating = Number(formData.get("rating"))
    const reviewData = {
        customerId,
        mealId,
        rating,
        comment,
        }
    const res = await reviewService.createReviews(reviewData)
    
   

  }

  return (
    <div className="w-1/2 shadow-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Leave your review</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="submit-review" action={submitReview}>
            <FieldGroup>
            <Field>
                <FieldLabel>Rating (1-5)</FieldLabel>
                <select
                  name="rating"
                  required
                  className="w-full border rounded px-2 py-1"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select rating
                  </option>
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </Field>

              <Field>
                <FieldLabel>Review</FieldLabel>
                <Textarea
                  placeholder="Write your review..."
                  name="comment"
                  required
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="submit-review" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewInput;