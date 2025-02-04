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
}