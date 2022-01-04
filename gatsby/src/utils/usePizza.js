import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas, values }) {
  //1. create state to hold the order
  // commented this line because the state was moved to context
  /* const [order, setOrder] = useState([]); */
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //2. Make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  //3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      //everything before item we want to remove
      ...order.slice(0, index),
      //everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      shehad: values.shehad,
    };
    //4. Sending data to a serverless function
    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await response.text());

    // check if everything worker
    if (response.status >= 400 && response.status <= 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage("Success! Come on down for your pizza");
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    message,
    loading,
    submitOrder,
  };
}
