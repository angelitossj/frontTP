import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [products, setProducts] = useState([]);
  const [ventas, setVentas] = useState([]);


  const consulta = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clientes", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      if (response.ok) {
        const data = await response.json();
        const newclientes = data.map((datos) => ({
          nombre: datos.nombre,
        }));
        setClientes(newclientes);
      } else {
        console.log(`Error de red: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const consulta2 = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/productos", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      if (response.ok) {
        const data = await response.json();
        const newProducts = data.map((datos) => ({
          nombre: datos.nombre,
        }));
        setProducts(newProducts);
        console.log(products);
      } else {
        console.log(`Error de red: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const consulta3 = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ventas", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      if (response.ok) {
        const data = await response.json();
        const newclientes = data.map((datos) => ({
          fecha: datos.fecha,
          nombre:datos.nombreProducto,
          cliente:datos.clienteProducto,
          cantidad:datos.cantidad,
          totalDeLaCompra:datos.totalCompra
        }));
        setVentas(newclientes);
        console.log(ventas)
      } else {
        console.log(`Error de red: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Puedes realizar alguna acción aquí si es necesario cuando el componente se monta.
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">Hola</h1>
      <button className="btn btn-danger" onClick={consulta}>
        Mostrar Clientes
      </button>
      <button className="btn btn-danger" onClick={consulta2}>
        Mostrar Productos
      </button>
      <button className="btn btn-danger" onClick={consulta3}>
        Mostrar Ventas
      </button>
      <div className="row">
        <div className="col">
          <h2>Clientes:</h2>
          <ul>
            {clientes.map((cliente, index) => (
              <li key={index}>{cliente.nombre}</li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Productos:</h2>
          <ul>
            {products.map((producto, index) => (
              <li key={index}>{producto.nombre}</li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Ventas Realizadas:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre del Producto</th>
                <th>Cliente</th>
                <th>Cantidad</th>
                <th>Total de la Compra</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.fecha}</td>
                  <td>{venta.nombre}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.totalDeLaCompra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
