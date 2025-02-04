export const calculatePoints = (receipt) => {
    let points = 0;
    for(let aggregator in pointAggregators) {
        points += pointAggregators[aggregator](receipt);
    }
    return points;
}

export const getRetailerPoints = ({retailer}) => {
    let count = 0;
    for(let i = 0; i < retailer.length; i++) {
        if(retailer[i].match(/[a-zA-Z0-9]/)) {
            count++;
        }
    }
    return count;
}

export const getRoundedTotalPricePoints = ({total}) => {
    return total.split('.')[1] === '00' ? 50 : 0;
}

export const getTotalPricePoints = ({total}) => {
    return total % 0.25 === 0 ? 25 : 0;
}

export const getItemCountPoints = ({items}) => {
    return Math.floor(items.length / 2) * 5;
}

export const getItemDescriptionLengthPoints = ({items}) => {
    let points = 0;
    items.forEach(item => {
        if(item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    });
    return points;
}

export const getPurchaseDayPoints = ({purchaseDate: date}) => {
    let dateOfMonth = parseInt(date.split('-')[2]);
    return dateOfMonth % 2 !== 0 ? 6 : 0;
}

export const getPurchaseTimePoints = ({purchaseTime : time}) => {
    let hour = parseInt(time.split(':')[0]);
    let minute = parseInt(time.split(':')[1]);
    return (hour >= 14 || (hour == 14 && minute > 0)) && (hour < 16) ? 10 : 0;
}

const pointAggregators = {
    retailer: getRetailerPoints,
    roundedTotalPrice: getRoundedTotalPricePoints,
    totalPrice: getTotalPricePoints,
    itemCount: getItemCountPoints,
    itemDescriptionLength: getItemDescriptionLengthPoints,
    purchaseDay: getPurchaseDayPoints,
    purchaseTime: getPurchaseTimePoints
}