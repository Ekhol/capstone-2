import axios from 'axios';

class MealDBApi {

    //static async makeGetRequest(cuisine) {

    //    const options = {
    //        method: 'GET',
    //        url: 'https://themealdb.p.rapidapi.com/filter.php',
    //        params: { a: `${cuisine}` },
    //        headers: {
    //            'X-RapidAPI-Key': '4ae5dacfccmsh5b342d082b2681bp1448f8jsn441e97c6dc00',
    //            'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
    //        }
    //    };

    //    await axios.request(options).then(function (response) {
    //        const res = response.data;
    //        console.log(res);
    //        return res;
    //    }).catch(function (error) {
    //        console.error(error);
    //    });
    //}

    //static async getMeals(cuisine) {

    //    const options = {
    //        method: 'GET',
    //        url: 'https://themealdb.p.rapidapi.com/filter.php',
    //        params: { a: `${cuisine}` },
    //        headers: {
    //            'X-RapidAPI-Key': '4ae5dacfccmsh5b342d082b2681bp1448f8jsn441e97c6dc00',
    //            'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
    //         }
    //    };

    //    await axios.request(options).then(function (response) {
    //        const res = response.data;
    //        console.debug(res.meals);
    //        return res.meals;
    //    }).catch(function (error) {
    //        console.error(error);
    //    });
    //}

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('MealDBAPI Call:', endpoint, data, method);

        const url = 'https://themealdb.p.rapidapi.com/filter.php?a=';
        const headers = {
            'X-RapidAPI-Key': '4ae5dacfccmsh5b342d082b2681bp1448f8jsn441e97c6dc00',
            'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
        }
        const params = (method === 'get')
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error('MealDBAPI Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getMeals(cuisine) {
        let res = await this.request(`${cuisine}`);
        console.debug(res);
        return res.meals;
    }
}

export default MealDBApi;