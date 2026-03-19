import { reviewService } from '@/app/services/review.service'
import { userService } from '@/app/services/user.service'
import { CustomerReviewTable } from '@/components/ui/reviewTable'
import React from 'react'

const ReviewPage = async () => {
  
    const getReview = await reviewService.getReview();
    const myReviews = getReview?.data?.data;
    console.log(myReviews);

    

  return (
    <div>
        <CustomerReviewTable myReviews={myReviews}></CustomerReviewTable>
    </div>
  )
}

export default ReviewPage