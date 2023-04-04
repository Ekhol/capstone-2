import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Loading from '../helpers/LoadingHelper';
import MealDBApi from '../api/MealDBApi';

function MealDBList(cuisine) {
    console.debug('MealDBList');
    const [mdbCountry, setmdbCountry] = useState(null);
    const qcuisine = cuisine;
    console.debug(mdbCountry);

    useEffect(function getMDBCountry() {
        console.debug('MealDBList useEffect GetDBMeals');
        async function getPreliminaryMeals() {
            const country = await MealDBApi.getMeals(qcuisine);
            console.debug(country);
            setmdbCountry(country);
        }
        getPreliminaryMeals();
    }, [qcuisine]);

    if (!mdbCountry) return <Loading />;

    const meals = mdbCountry.meals;

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