const lib = require('../routes'); 
const request = require('supertest');
const app = require('../server');
const results = require("./results.json")
let db;

beforeAll(async () =>{
    db = await lib.connect();
});

describe ('Test /player endpoint', () => {
    test('id is missing', async () => {
        await request(app).get('/player')
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.text).error).toBe('id is missing');
        })
    });

    test('status code and Ubaldo Jimenez info', async () => 
        await request(app).get('/player?id=8343')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).data[0].FirstName).toBe('Ubaldo');
            expect(JSON.parse(response.text).data[0].LastName).toBe('Jimenez');
            expect(JSON.parse(response.text).data[0].BirthCity).toBe('Nagua');
        }
    ));
});

describe('Test /head2head/players', () => {
    test('ids are missing', async () => {
        await request(app).get('/head2head/players/')
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.text).error).toBe('batter or pitcher id is missing');
        })
    });

    test('Justin Upton and Ubaldo Jimenez statistics', async () => {
        await request(app).get('/head2head/players?batter=17282&pitcher=8343')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual(results.head2headPlayer);
        })
    });
})

describe ('Test /teams/wins', () => {
    test('home and away wins', async () => {
        await request(app).get('/teams/wins')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual(results.teamWins);
        });
    });
})