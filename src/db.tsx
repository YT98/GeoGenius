import mysql from 'mysql2';
import axios from 'axios';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'geogenius',
    password: 'pass',
    database: 'geogenius'
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to the database:", err);
    } else {
        console.log("Connected to database.");
    }
});

const clearCountries = async () => {
    try {
        const query = 'DELETE FROM countries';
        await connection.execute(query);
        console.log("Data has been cleared.")
    } catch (err) {
        console.log("Error while clearing data:", err);
    }
}

const populateCountries = async () => {
    try {

        await clearCountries();

        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        for (const country of countries) {
            const { cca2, name, capital, region } = country;
            const capitalValue = capital?.[0] || '';
            const query = 'INSERT INTO countries (country_code, country_name, capital, region) VALUES (?, ?, ?, ?)';
            await connection.execute(query, [cca2, name.common, capitalValue, region]);
        }

        console.log("Country data has been populated.")

    } catch(err) {
        console.log("Error populating data:", err);
    }
}

// populateCountries();

export default connection;