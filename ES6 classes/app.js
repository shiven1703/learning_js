class PizzaStore {

    constructor(orderID, customerName, amount){
        this.orderID = orderID;
        this.customerName = customerName;
        this.amount = amount;
    }

    newOrder(){
        const status = `Dear ${this.customerName}, your order is being prepared.`;
        console.log(status);
    }

}

class Zomato extends PizzaStore {

    constructor(zomatoAccID, orderID, customerName, amount){
        super(orderID, customerName, amount);
        this.zomatoAccID = zomatoAccID;
    }

    newOrder(){
        const status = `Your order with Account ID ${this.zomatoAccID}, is being prepared`;
        console.log(status);
    }

    static addSpecialDiscount(note){
        this.specialNote = note;
    }

    static getSpecialDiscount(){
        if(this.specialNote !== ""){
            console.log(this.specialNote);
        }else{
            console.log("No Special Notes.");
        }
    }
}


const shivam = new Zomato(1,'Shivam',500);
shivam.newOrder();
Zomato.addSpecialDiscount("10% Discount on all orders.");
Zomato.getSpecialDiscount();