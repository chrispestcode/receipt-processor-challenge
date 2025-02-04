import {calculatePoints} from './PointAggregators.mjs';

export default class ReceiptPoints {
    constructor(receipt) {
        this.receipt = receipt;
        this.points = calculatePoints(receipt);
    }

    getPoints() {
        return this.points;
    }
    
    getReceipt() {
        return this.receipt;
    }

    // pointValidators = {
    //     retailer: this.getRetailerPoints,
    //     roundedTotalPrice: this.getRoundedTotalPricePoints,
    //     totalPrice: this.getTotalPricePoints,
    //     itemCount: this.getItemCountPoints,
    //     itemDescriptionLength: this.getItemDescriptionLengthPoints,
    //     purchaseDay: this.getPurchaseDayPoints,
    //     purchaseTime: this.getPurchaseTimePoints
    // }

    // calculatePoints() {
    //     let points = 0;
    //     for(let validator in this.pointValidators) {
    //         points += this.pointValidators[validator](this.receipt);
    //     }
    //     this.points = points;
    // }

    // getRetailerPoints({retailer}) {
    //     let count = 0;
    //     for(let i = 0; i < retailer.length; i++) {
    //         if(retailer[i].match(/[a-zA-Z0-9]/)) {
    //             count++;
    //         }
    //     }
    //     return count;
    // }

    // getRoundedTotalPricePoints({total}) {
    //     return total.split('.')[1] === '00' ? 50 : 0;
    // }

    // getTotalPricePoints({total}) {
    //     return total % 0.25 === 0 ? 25 : 0;
    // }

    // getItemCountPoints({items}) {
    //     return Math.floor(items.length / 2) * 5;
    // }

    // getItemDescriptionLengthPoints({items}) {
    //     let points = 0;
    //     items.forEach(item => {
    //         if(item.shortDescription.trim().length % 3 === 0) {
    //             points += Math.ceil(item.price * 0.2);
    //         }
    //     });
    //     return points;
    // }

    // getPurchaseDayPoints({purchaseDate: date}) {
    //     let dateOfMonth = parseInt(date.split('-')[2]);
    //     return dateOfMonth % 2 !== 0 ? 6 : 0;
    // }

    // getPurchaseTimePoints({purchaseTime : time}) {
    //     let hour = parseInt(time.split(':')[0]);
    //     let minute = parseInt(time.split(':')[1]);
    //     return (hour >= 14 || (hour == 14 && minute > 0)) && (hour < 16) ? 10 : 0;
    // }

    
}