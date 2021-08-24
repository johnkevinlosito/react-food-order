import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://food-order-88ddf-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
            );
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }
            setMeals(loadedMeals);
        };
        fetchMeals().catch((err) => {
            setHttpError(err.message);
        });

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <section className={classes.meals}>
                <Card>
                    <p>Loading...</p>
                </Card>
            </section>
        );
    }
    if (httpError) {
        return (
            <section className={classes.meals}>
                <Card>
                    <p>{httpError}</p>
                </Card>
            </section>
        );
    }
    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
