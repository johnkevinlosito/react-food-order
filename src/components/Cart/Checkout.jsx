import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal,
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div
                className={`${classes.control} ${
                    formInputValidity.name ? "" : classes.invalid
                }`}
            >
                <label htmlFor="name">Your Name</label>
                <input type="text" ref={nameInputRef} id="name" />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div
                className={`${classes.control} ${
                    formInputValidity.street ? "" : classes.invalid
                }`}
            >
                <label htmlFor="street">Street</label>
                <input type="text" ref={streetInputRef} id="street" />
                {!formInputValidity.street && <p>Please enter a street!</p>}
            </div>
            <div
                className={`${classes.control} ${
                    formInputValidity.postal ? "" : classes.invalid
                }`}
            >
                <label htmlFor="postal">Postal Code</label>
                <input type="text" ref={postalInputRef} id="postal" />
                {!formInputValidity.postal && (
                    <p>Please enter a valid postal code (5 characters long)!</p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    formInputValidity.city ? "" : classes.invalid
                }`}
            >
                <label htmlFor="city">City</label>
                <input type="text" ref={cityInputRef} id="city" />
                {!formInputValidity.city && <p>Please enter a city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
