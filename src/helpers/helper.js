export const gntCorrectBill = (bill) => {
    return bill.toString().match(/\d{1,3}(?=(\d{3})*$)/g).join(',');
}