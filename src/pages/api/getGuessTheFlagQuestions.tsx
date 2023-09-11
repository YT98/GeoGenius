import { RowDataPacket } from 'mysql2';
import db from '../../db';
import { NextApiRequest, NextApiResponse } from 'next';

interface Country extends RowDataPacket {
    country_name: String,
    country_code: String,
    capital: String
}

interface Question {
    correctCountryCountryCode: String,
    correctCountryCountryName: String,
    optionsCountryNames: String[]
}

/* The `getRandomArbitrary` function generates a random number between a minimum and maximum
value, excluding any numbers specified in the `except` array. */
function getRandomArbitrary(min: number, max: number, except: number[]): number {
    let num = Math.floor(Math.random() * (max - min) + min);
    except.forEach(element => {
        if (num === element) {
            num = getRandomArbitrary(min, max, except)
        }
    });
    return num
}

/* The `generateRandomOptionIndexes` function generates an array of random indexes from
the `rows` array, which represents the countries. It takes three parameters: `rows`
(an array of countries), `numberOfOptions` (the number of random indexes to generate),
and `except` (an index to exclude from the generated indexes). */
function generateRandomOptionIndexes(rows: Country[], numberOfOptions: number, except: number): number[] {
    let optionIndexes: number[] = []
    for(let i = 0; i < numberOfOptions; i++) {
        optionIndexes.push(getRandomArbitrary(0, rows.length, optionIndexes.concat([except])))
    }
    return optionIndexes
}

/**
 * Generate a flag question by randomly selecting options from a list of countries and
 * providing the correct country's flag URL, country name, and a list of option country names.
**/
function generateFlagQuestion(countries: Country[], correctCountry: Country, correctCountryIndex: number): Question {
    let optionIndexes = generateRandomOptionIndexes(countries, 3, correctCountryIndex)
    let optionsCountryNames = optionIndexes.map((index) => countries[index].country_name)
    optionsCountryNames.push(correctCountry.country_name)
    shuffleArray(optionsCountryNames)

    return {
        correctCountryCountryCode: correctCountry.country_code.toLowerCase(),
        correctCountryCountryName: correctCountry.country_name,
        optionsCountryNames: optionsCountryNames
    }
}

/**
 * Shuffle an array by randomly selecting elements and rearranging them.
 */
function shuffleArray(arr: any[]): any[] {
    var len = arr.length;
    var d = len;
    var array = [];
    var k, i;
    for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(arr[k]);
        arr.splice(k, 1);
        len = arr.length;
    }
    for (i = 0; i < d; i++) {
        arr[i] = array[i];
    }
    return arr;
}


/**
 * Retrieve flag-related questions based on the specified region from a database and returns them as JSON.
 */
const getGuessTheFlagQuestions = async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { region } = req.query;
        let query = 'SELECT * FROM countries WHERE region = ?';
        if (region == "world") {
            query = 'SELECT * FROM countries';
        }

        // Execute the query with the region parameter and await the result
        const [rows] = await db.promise().query<Country[]>(query, [region]);

        // Use map to transform rows into questions
        let questions: Question[] = []
        if (Array.isArray(rows)) {
            shuffleArray(rows)
            questions = rows.map((row: Country, index: number) => (generateFlagQuestion(rows, row, index)));
        }

        res.status(200).json(questions);
    } catch (err) {
        console.log("Error fetching data:", err);
        res.status(500).json({ error: 'An error occured when fetching data. '})
    }
}

export default getGuessTheFlagQuestions;