import styles from "./reviews.module.scss";
import star from '/src/assets/star.png';

const Reviews = ({ reviews }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    return (
        <div className={styles.main}>
            <div className={styles.heading}>Reviews & Rating</div>
            <div className={styles.reviewsCnr}>
                {
                    reviews
                        ? reviews.map((review, i) =>
                            <div key={i} className={styles.review}>
                                <div className={styles.ratingCnr}>
                                    <img src={star} className={styles.star} />
                                    <div className={styles.rating}>{review.rating}</div>
                                </div>
                                <div className={styles.body}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userName}>{review.reviewerName}</div>
                                        <div className={styles.date}>{formatDate(review.date)}</div>
                                    </div>
                                    <div className={styles.comment}>
                                        {review.comment}
                                    </div>
                                </div>
                            </div>
                        )

                        : <div>No reviews for this product</div>
                }

            </div>
        </div>
    )
}

export default Reviews;