import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../state/cart-context";

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const cartItemsQty = cartCtx.items.reduce((current, item) => {
        return current + item.qty;
    }, 0);

    const { items } = cartCtx;
    const btnClasses = `${classes.button} ${btnHighlighted && classes.bump}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartItemsQty}</span>
        </button>
    );
};

export default HeaderCartButton;
