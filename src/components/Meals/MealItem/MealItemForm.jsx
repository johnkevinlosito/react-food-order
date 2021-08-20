import React, { useState, useRef } from "react";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const qtyRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const selectedQty = qtyRef.current.value;
        props.onAddToCart(+selectedQty);
        setQty(1);
    };
    const [qty, setQty] = useState(1);

    const reduceQtyHandler = () => {
        qty > 1 ? setQty((prevQty) => prevQty - 1) : setQty(1);
    };

    const addQtyHandler = () => {
        setQty((prevQty) => prevQty + 1);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <button
                    type="button"
                    className={classes.btn_qty}
                    onClick={reduceQtyHandler}
                >
                    -
                </button>
                {qty}

                <button
                    type="button"
                    className={classes.btn_qty}
                    onClick={addQtyHandler}
                >
                    +
                </button>
            </div>
            <input type="hidden" ref={qtyRef} id="qty" name="qty" value={qty} />
            <button type="submit" className={classes.button}>
                Add to cart
            </button>
        </form>
    );
};

export default MealItemForm;
