import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SupperClubApi from '../api/SupperClubApi';
import Loading from '../helpers/LoadingHelper';

function CountriesList() {
    console.debug('CountriesList');
    const [countries, setCountries] = useState(null);

    useEffect(function getAllCountries() {
        console.debug('CountriesList useEffect GetAllCountries');
        search();
    }, []);

    async function search() {
        let countries = await SupperClubApi.getCountries();
        setCountries(countries);
    }

    if (!countries) return <Loading />;

    return (
        <div>
            {countries.length
                ? (
                    <ul>
                        {countries.map(c => (
                            <li>
                                <Button
                                    href={`/country/${c.id}`}
                                >
                                    {c.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Countries Found.</p>
                )
            }
        </div>
    );
}

export default CountriesList;