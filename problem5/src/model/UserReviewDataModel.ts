import { DataModel } from "./DataModel";

export class UserReviewDataModel extends DataModel {
    private user_name!: string;
    private email!: string;
    private rating!: number;
    private detail_review!: string;
    private upvote_count!: number;

    constructor(user_name: string, email: string, rating: number, detail_review: string) {
        super();
        if(!email.match("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            throw new Error("Invalid email: " + email);
        if(rating < 0 || rating > 10) throw new Error("Invalid rating");
        
        this.user_name = user_name;
        this.email = email;
        this.rating = rating;
        this.detail_review = detail_review;
    }

    getUserName(): string {return this.user_name};
    getEmail(): string {return this.email};
    getRating(): number {return this.rating};
    getDetailReview(): string {return this.detail_review};
    getUpvoteCount(): number {return this.upvote_count};

    setUserName(newUserName: string): void {this.user_name = newUserName};
    setEmail(newEmail: string): void {
        if(!newEmail.match("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            throw new Error("Invalid email: " + newEmail);
        this.email = newEmail;
    }
    setRating(newRating: number) : void {
        if(newRating < 0 || newRating > 10) throw new Error("Invalid rating");
        this.rating = newRating;
    } 
    setDetailReview(newDetailReview : string): void {
        this.detail_review = newDetailReview;
    }
    setUpvoteCount(newUpvoteCount: number) : void {
        this.upvote_count = newUpvoteCount;
    }
}