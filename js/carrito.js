
let total = 0;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartElement.appendChild(cartItem);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}
///
let cart = []; // almacenar los productos del carrito
        let formData = {}; // almacenar los datos del formulario

        function addToCart(productName, productPrice) {
            cart.push({ name: productName, price: productPrice });
            displayCart(); // Actualizar la visualización del carrito
        }

        function displayCart() {
            const cartContainer = document.getElementById('cart');
            cartContainer.innerHTML = ''; // Limpiar el contenido anterior

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                `;
                cartContainer.appendChild(itemElement);
            });

            // Actualizar el total
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            document.getElementById('total').textContent = total.toFixed(2);
        }

        function removeFromCart(index) {
            cart.splice(index, 1); // Eliminar el producto del carrito
            displayCart(); // Actualizar la visualización del carrito
        }

        function generateCartHTML() {
            let cartHTML = `
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black; padding: 8px;">Producto</th>
                            <th style="border: 1px solid black; padding: 8px;">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            cart.forEach(item => {
                cartHTML += `
                    <tr>
                        <td style="border: 1px solid black; padding: 8px;">${item.name}</td>
                        <td style="border: 1px solid black; padding: 8px;">$${item.price.toFixed(2)}</td>
                    </tr>
                `;
            });

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartHTML += `
                    <tr>
                        <td style="border: 1px solid black; padding: 8px;"><strong>Total</strong></td>
                        <td style="border: 1px solid black; padding: 8px;"><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
                </table>
            `;

            return cartHTML; // Devolver el HTML de la tabla como una cadena
        }

        document.getElementById('btn-enviar-info').addEventListener('click', () => {
            const form = document.querySelector('.pedido-form');
            const data = new FormData(form);
            formData = {
                Cliente: data.get('customer-name'),
                email: data.get('customer-email')
            };
            alert('Ya puedes realizar el pedido.');
        });

        document.getElementById('btn-finalizar-pedido').addEventListener('click', () => {
            if (!formData.email) {
                alert('Primero envía la información.');
                return;
            }

            const cartHTML = generateCartHTML(); // Generar el HTML del carrito

            // Enviar correo al cliente
            emailjs.send('default_service', 'template_om8ne37', {
                to_email: formData.email, // Correo del cliente
                customerName: formData.Cliente,
                carrito: cartHTML // HTML del carrito generado en JavaScript
            })
            .then(() => {
                // Enviar una copia a tu correo
                return emailjs.send('default_service', 'template_om8ne37', {
                    to_email: 'berrybliss424@gmail.com', // Tu correo para recibir una copia
                    customerName: formData.Cliente,
                    carrito: cartHTML // HTML del carrito generado en JavaScript
                });
            })
            .then(() => {
                alert('Pedido realizado con éxito.');
            })
            .catch((error) => {
                console.error('Error al enviar el pedido:', error.text || error);
                alert('Hubo un problema al enviar el pedido. Por favor, inténtalo de nuevo más tarde.');
            });
        });