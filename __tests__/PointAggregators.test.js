import ReceiptPoints from '../src/ReceiptPoints.mjs';
import {getRetailerPoints, getRoundedTotalPricePoints, getTotalPricePoints, 
  getItemCountPoints, getItemDescriptionLengthPoints, getPurchaseDayPoints, getPurchaseTimePoints} from '../src/PointAggregators.mjs';

describe('ReceiptPoints', () => {
  let RECEIPT_MM;
  let RECEIPT_TARGET;

  beforeEach(() => {
    RECEIPT_MM = {
        "retailer": "M&M Corner Market",
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
          {
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          }
        ],
        "total": "9.00"
    };

    RECEIPT_TARGET = {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
          },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
          },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
          }
        ],
        "total": "35.35"
    };
  });

  test('should correctly calculate points based on retailer', () => {
    expect(getRetailerPoints(RECEIPT_MM)).toBe(14);

    expect(getRetailerPoints(RECEIPT_TARGET)).toBe(6);
  });

  test('should correctly calculate points based on rounded total price', () => {
    expect(getRoundedTotalPricePoints(RECEIPT_MM)).toBe(50);

    expect(getRoundedTotalPricePoints(RECEIPT_TARGET)).toBe(0);
  });

  test('should correctly calculate points based on total price being divisible by 0.25', () => {
    expect(getTotalPricePoints(RECEIPT_MM)).toBe(25);

    expect(getTotalPricePoints(RECEIPT_TARGET)).toBe(0);
  });

  test('should calculate item count points correctly', () => {
    expect(getItemCountPoints(RECEIPT_MM)).toBe(10);

    expect(getItemCountPoints(RECEIPT_TARGET)).toBe(10);
  });

  test('should calculate item description length points correctly', () => {
    expect(getItemDescriptionLengthPoints(RECEIPT_MM)).toBe(0);

    expect(getItemDescriptionLengthPoints(RECEIPT_TARGET)).toBe(6);
  });

  test('should calculate purchase day points correctly', () => {
    expect(getPurchaseDayPoints(RECEIPT_MM)).toBe(0);

    expect(getPurchaseDayPoints(RECEIPT_TARGET)).toBe(6);
  });

  test('should calculate purchase time points correctly', () => {
    expect(getPurchaseTimePoints(RECEIPT_MM)).toBe(10);

    expect(getPurchaseTimePoints(RECEIPT_TARGET)).toBe(0);
  });
});
