import axios from 'axios';

class MealDBApi {

    static async makeGetRequest(cuisine) {

        const options = {
            method: 'GET',
            url: 'https://themealdb.p.rapidapi.com/filter.php',
            params: { a: `${cuisine}` },
            headers: {
                'X-RapidAPI-Key': '4ae5dacfccmsh5b342d082b2681bp1448f8jsn441e97c6dc00',
                'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
            }
        };

        await axios.request(options).then(function (response) {
            const res = response.data;
            console.log(res);
            return res;
        }).catch(function (error) {
            console.error(error);
        });
    }
}

export default MealDBApi;