
function ProductTotal(productName, price, quantity, isGiftWrapped) {
    let productTotal = price * quantity;
    if (isGiftWrapped) {
        productTotal += quantity * 1; // Gift wrap fee is $1 per unit
    }
    console.log(`${productName}: Quantity - ${quantity}, Total - $${productTotal}`);
    return productTotal;
}

// Function to apply discounts based on the rules provided
function Discounts(cartTotal, productQuantities) {
    let discounts = {
        "flat_10_discount": cartTotal > 200 ? 10 : 0,
        "bulk_5_discount": 0,
        "bulk_10_discount": 0,
        "tiered_50_discount": 0
    };

    for (let quantity of Object.values(productQuantities)) {
        if (quantity > 10) {
            discounts["bulk_5_discount"] = 5;
        }
    }

    if (Object.values(productQuantities).reduce((a, b) => a + b) > 20) {
        discounts["bulk_10_discount"] = 10;
    }

    if (Object.values(productQuantities).reduce((a, b) => a + b) > 30 && Object.values(productQuantities).some(quantity => quantity > 15)) {
        discounts["tiered_50_discount"] = 50;
    }

    let applicableDiscount = Object.keys(discounts).reduce((a, b) => discounts[a] > discounts[b] ? a : b);
    let discountAmount = (cartTotal * discounts[applicableDiscount]) / 100;
    return [applicableDiscount, discountAmount];
}

// Function to calculate shipping fee
function calculateShippingFee(totalQuantity) {
    return Math.floor(totalQuantity / 10) * 5;
}

// Function to get user input and calculate the total
function main() {
    const products = {
        "Product A": 20,
        "Product B": 40,
        "Product C": 50
    };
    let productQuantities = {};
    let total = 0;

    for (let [productName, price] of Object.entries(products)) {
        let quantity = parseInt(prompt(`Enter the quantity of ${productName}: `));
        let isGiftWrapped = prompt(`Do you want to wrap ${productName} as a gift? (yes/no): `).toLowerCase() === "yes";
        total += ProductTotal(productName, price, quantity, isGiftWrapped);
        productQuantities[productName] = quantity;
    }

    let cartTotal = total;
    let [discountName, discountAmount] = Discounts(cartTotal, productQuantities);
    let shippingFee = calculateShippingFee(Object.values(productQuantities).reduce((a, b) => a + b));
    total -= discountAmount;
    total += shippingFee;

    console.log(`\nSubtotal: $${cartTotal}`);
    console.log(`Discount Applied: ${discountName} - $${discountAmount}`);
    console.log(`Shipping Fee: $${shippingFee}`);
    console.log(`Total: $${total}`);
}

main();
