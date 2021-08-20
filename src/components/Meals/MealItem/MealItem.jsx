import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../state/cart-context";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (qty) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            qty: qty,
            price: props.price,
        });
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${props.price.toFixed(2)}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
