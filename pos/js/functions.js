// Variable para guardar el carrito con cantidad de cada producto
let carrito = new Map();

// Función que se ejecuta cuando el usuario presiona una tecla en el input
function buscarProducto(event){
    // Verifica si la tecla presionada es Enter (código 13)
    if(event.keyCode === 13){
        // Obtiene el valor del input (código del producto)
        const input = document.getElementById("codigo").value; 
        
        // Itera sobre todos los productos en el array de productos
        for(let i = 0; i < productos.length; i++){
            // Compara el código ingresado con el código del producto actual
            if(productos[i][0] === input){
                // Verifica si el producto ya existe en el carrito usando Map.has()
                if(carrito.has(input)){
                    // Si ya existe, obtiene el producto y incrementa la cantidad
                    const productoExistente = carrito.get(input);
                    productoExistente.cantidad++;
                    // Actualiza el producto en el Map
                    carrito.set(input, productoExistente);
                } else {
                    // Si no existe, crea un nuevo objeto con los datos del producto
                    carrito.set(input, {
                        nombre: productos[i][1],      // Nombre del producto
                        precio: parseFloat(productos[i][2]),  // Precio convertido a número decimal
                        cantidad: 1                   // La cantidad inicial es 1
                    });
                }
                
                // Llama la función para actualizar la tabla con los cambios
                actualizarTabla();
                
                // Limpia el input para que el usuario pueda buscar otro producto
                document.getElementById("codigo").value = "";
                // Sale de la función
                return;
            }
        }
    }
}

// Función que reconstruye y actualiza la tabla del carrito
function actualizarTabla(){
    // Obtiene el elemento tbody (cuerpo de la tabla) del HTML
    const tbody = document.getElementById("carrito");
    // Limpia todas las filas anteriores para reescribir desde cero
    tbody.innerHTML = "";
    
    // Variable para acumular el total de todos los productos
    let totalGeneral = 0;
    
    // Itera sobre cada producto en el Map del carrito
    // Map.forEach mantiene el orden de inserción
    carrito.forEach((producto, codigo) => {
        // Crea una nueva fila en la tabla
        const row = tbody.insertRow();
        
        // Crea 4 celdas para cada columna: Producto, Precio, Cantidad, Total
        const cell1 = row.insertCell(0); // Celda del nombre del producto
        const cell2 = row.insertCell(1); // Celda del precio unitario
        const cell3 = row.insertCell(2); // Celda de la cantidad
        const cell4 = row.insertCell(3); // Celda del total del producto
        
        // Asigna las clases CSS a cada celda para la alineación correcta
        cell1.className = "col-producto";
        cell2.className = "col-precio";
        cell3.className = "col-cantidad";
        cell4.className = "col-total";
        
        // Calcula el total de este producto (precio × cantidad)
        const totalProducto = producto.precio * producto.cantidad;
        // Suma este total al total general
        totalGeneral += totalProducto;
        
        // Rellena las celdas con los datos del producto
        cell1.innerHTML = producto.nombre;                          // Nombre
        cell2.innerHTML = "$" + producto.precio.toFixed(2);         // Precio con 2 decimales
        cell3.innerHTML = producto.cantidad;                        // Cantidad
        cell4.innerHTML = "$" + totalProducto.toFixed(2);           // Total con símbolo $
    });
    
    // Crea una nueva fila para mostrar el total general
    const rowTotal = tbody.insertRow();
    // Asigna una clase especial a esta fila para darle estilos diferentes
    rowTotal.className = "fila-total";
    
    // Crea 4 celdas en la fila de total
    const cellTotalLabel = rowTotal.insertCell(0);    // Celda que dirá "TOTAL"
    const cellTotalEmpty1 = rowTotal.insertCell(1);   // Celda vacía (alineación)
    const cellTotalEmpty2 = rowTotal.insertCell(2);   // Celda vacía (alineación)
    const cellTotalAmount = rowTotal.insertCell(3);   // Celda que mostrará el total
    
    // Asigna las clases CSS a cada celda de la fila de total
    cellTotalLabel.className = "col-producto";
    cellTotalEmpty1.className = "col-precio";
    cellTotalEmpty2.className = "col-cantidad";
    cellTotalAmount.className = "col-total";
    
    // Rellena la primera celda con el texto "TOTAL" en negrita
    cellTotalLabel.innerHTML = "<strong>TOTAL</strong>";
    // Rellena la última celda con el total general en negrita con 2 decimales
    cellTotalAmount.innerHTML = "<strong>$" + totalGeneral.toFixed(2) + "</strong>";
}