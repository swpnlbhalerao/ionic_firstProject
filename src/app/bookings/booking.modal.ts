export class Booking{
    constructor(
        public Id:string,
        public placeId:string,
        public placeTitle:string,
        public  placeImageUrl:string,
        public firstName:string,
        public lastName:string,
        public guestNo:Number,
        public bookingFrom:Date,
        public bookingTo:Date,
       public userId:string
    ){}

}