from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/sendOrderEmail', methods=['POST'])
def send_order_email():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    pizza_type = data['pizzaType']
    size = data['size']
    quantity = data['quantity']
    toppings = ', '.join(data['toppings'])
    total = data['total']
    address = data['address']
    phone = data['phone']
    email = data['email']

    subject = "Order Confirmation - Your Pizza Order"
    message = f"""
    Thank you for your order!

    Pizza Type: {pizza_type.capitalize()}
    Pizza Size: {size.capitalize()}
    Quantity: {quantity}
    Toppings: {toppings if toppings else 'None'}
    Total Price: ${total:.2f}
    Delivery Address: {address}
    Phone Number: {phone}

    We will deliver your order shortly.

    Thank you for choosing our pizza service!
    """

    sender_email = "your_email@example.com"
    receiver_email = email
    password = "your_email_password"  

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    try:
        with smtplib.SMTP('smtp.example.com', 587) as server: 
            server.starttls()
            server.login(sender_email, password)
            server.send_message(msg)

        return jsonify({"message": "Order confirmation email sent."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
