import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.qty;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                qty: existingCartItem.qty + action.item.qty,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.qty === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                qty: existingCartItem.qty - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "CLEAR") {
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, cartDispatchAction] = useReducer(
        cartReducer,
        defaultCartState
    );
    const addItemHandler = (item) => {
        cartDispatchAction({ type: "ADD", item: item });
    };
    const removeItemHandler = (id) => {
        cartDispatchAction({ type: "REMOVE", id: id });
    };
    const clearCartHandler = (id) => {
        cartDispatchAction({ type: "CLEAR", id: id });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
