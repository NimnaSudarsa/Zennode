def calculate_product_total(product_name, price, quantity, is_gift_wrapped):
    product_total = price * quantity
    if is_gift_wrapped:
        product_total += quantity * 1 
    print(f"{product_name}: Quantity - {quantity}, Total - ${product_total}")
    return product_total

def discounts(cart_total, product_quantities):
    discounts = {
        "flat_10_discount": 10 if cart_total > 200 else 0,
        "bulk_5_discount": 0,
        "bulk_10_discount": 0,
        "tiered_50_discount": 0
    }

    for product_quantity in product_quantities.values():
        if product_quantity > 10:
            discounts["bulk_5_discount"] = 5
        if sum(product_quantities.values()) > 20:
            discounts["bulk_10_discount"] = 10
        if sum(product_quantities.values()) > 30 and any(quantity > 15 for quantity in product_quantities.values()):
            discounts["tiered_50_discount"] = 50
            break

    applicable_discount = max(discounts, key=discounts.get)
    discount_amount = (cart_total * discounts[applicable_discount]) / 100
    return applicable_discount, discount_amount

def shipping_fee(total_quantity):
    return (total_quantity // 10) * 5

def main():
    products = {
        "Product A": 20,
        "Product B": 40,
        "Product C": 50
    }
    product_quantities = {}
    total = 0

    for product_name, price in products.items():
        quantity = int(input(f"Enter the quantity of {product_name}: "))
        is_gift_wrapped = input(f"Do you want to wrap {product_name} as a gift? (yes/no): ").lower() == "yes"
        total += calculate_product_total(product_name, price, quantity, is_gift_wrapped)
        product_quantities[product_name] = quantity

    cart_total = total
    discount_name, discount_amount = discounts(cart_total, product_quantities)
    shipping_fee = shipping_fee(sum(product_quantities.values()))
    total -= discount_amount
    total += shipping_fee

    print(f"\nSubtotal: ${cart_total}")
    print(f"Discount Applied: {discount_name} - ${discount_amount}")
    print(f"Shipping Fee: ${shipping_fee}")
    print(f"Total: ${total}")

if __name__ == "__main__":
    main()
