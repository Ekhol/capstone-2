import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Loading from '../helpers/LoadingHelper';
import MealDBApi from '../api/MealDBApi';

function MealDBList(cuisine) {
    console.debug('MealDBList');
    const [meals, setMeals] = useState(null);

    useEffect(function getDBMeals() {
        console.debug('MealDBList useEffect GetDBMeals');
        async function getPreliminaryMeals() {
            setMeals(await MealDBApi.getMeals(cuisine));
        }
        getPreliminaryMeals();
    }, [cuisine]);

    console.log(meals);
    if (!meals) return <Loading />;

    return (
        <div>
            {meals.length
                ? (
                    <ul>
                        {meals.map(c => (
                            <li>
                                <Button
                                    href={`/mdb-recipe/${c.idMeal}`}
                                >
                                    {c.strMeal}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No MealDB Recipes Found.</p>
                )
            }
        </div>
    );
}

export default MealDBList;