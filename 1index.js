function updatePrice() {
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    const toppings = document.querySelectorAll('input[name="topping"]:checked');

    let total = 0;

    switch (size) {
        case 'small':
            total += 10;
            break;
        case 'medium':
            total += 15;
            break;
        case 'large':
            total += 20;
            break;
    }

    toppings.forEach(topping => {
        switch (topping.value) {
            case 'cheese':
                total += 2;
                break;
            case 'pepperoni':
                total += 3;
                break;
            case 'mushrooms':
                total += 1.5;
                break;
            case 'corn':
                total += 2;
                break;
            case 'ham':
                total += 2;
                break;
            case 'sliced_olives':
                total += 1;
                break;
        }
    });

    total *= quantity;

    document.getElementById('totalPrice').innerText = `Total Price: ${total.toFixed(2)} €`;
}

function calculateOrder() {
    const pizzaType = document.getElementById('pizzaType').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    const toppings = document.querySelectorAll('input[name="topping"]:checked');
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    let total = 0;

    switch (size) {
        case 'small':
            total += 10;
            break;
        case 'medium':
            total += 15;
            break;
        case 'large':
            total += 20;
            break;
    }

    toppings.forEach(topping => {
        switch (topping.value) {
            case 'cheese':
                total += 2;
                break;
            case 'pepperoni':
                total += 3;
                break;
            case 'mushrooms':
                total += 1.5;
                break;
            case 'corn':
                total += 2;
                break;
            case 'ham':
                total += 2;
                break;
            case 'sliced_olives':
                total += 1;
                break;
        }
    });

    total *= quantity;

    const summary = `
        <h3>Order Summary</h3>
        <p>Pizza Type: ${pizzaType.charAt(0).toUpperCase() + pizzaType.slice(1)}</p>
        <p>Pizza Size: ${size.charAt(0).toUpperCase() + size.slice(1)}</p>
        <p>Quantity: ${quantity}</p>
        <p>Toppings: ${Array.from(toppings).map(t => t.value).join(', ') || 'None'}</p>
        <p>Total Price: $${total.toFixed(2)}</p>
        <p>Delivery Address: ${address}</p>
        <p>Phone Number: ${phone}</p>
        <p>Email Address: ${email}</p>
    `;

    const orderSummaryDiv = document.getElementById('orderSummary');
    orderSummaryDiv.innerHTML = summary;
    orderSummaryDiv.style.display = 'block';

    document.getElementById('seeOrderSummaryButton').style.display = 'none';
    document.getElementById('placeOrderButton').style.display = 'block';

    window.orderDetails = {
        pizzaType,
        size,
        quantity,
        toppings: Array.from(toppings).map(t => t.value),
        total,
        address,
        phone,
        email
    };
}

async function placeOrder() {
    // Send the order details to the server-side script
    const response = await fetch('/sendOrderEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(window.orderDetails),
    });

    if (response.ok) {
        alert("Order placed successfully! A confirmation email has been sent.");
    } else {
        alert("There was an issue placing your order. Please try again.");
    }

    document.getElementById('pizzaOrderForm').reset();
    document.getElementById('orderSummary').style.display = 'none';
    document.getElementById('totalPrice').innerText = "Total Price: 0.00 €";

    document.getElementById('placeOrderButton').style.display = 'none';
    document.getElementById('seeOrderSummaryButton').style.display = 'block';
}
