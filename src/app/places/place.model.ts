import { PlaceLocation } from './location.model';


export class Place {
     constructor(
        public id: string,
        public title: string,
        public desc: string,
        public imageUrl: string,
        public price: Number,
        public availableFrom:Date,
        public availableTo:Date,
        public userId:string,
        public location: PlaceLocation
    ){}

}