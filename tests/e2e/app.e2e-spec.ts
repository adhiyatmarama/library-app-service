import request from 'supertest';
import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import {
    findAuthorByKeyHttpResponse,
    findBookByBookKeyHttpResponse,
    findBooksBySubjectHttpResponse
} from '../unit/resources/libs/open-library';
import { findBooksBySubjectResult, findSubjectsResult } from '../unit/resources/books';
import { findAllOrderResult, mockNewOrder, mockOrder } from '../unit/resources/orders';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });

    describe('/books', () => {
        const mainRoute = '/books';
        describe('GET /subjects/:subject', () => {
            it('should response with 200 and list of books', () => {
                mockedAxios.get = jest.fn().mockResolvedValueOnce({
                    data: findBooksBySubjectHttpResponse
                });
                return request(app.getHttpServer())
                    .get(`${mainRoute}/subjects/photography`)
                    .expect(200)
                    .expect(findBooksBySubjectResult);
            });
        });

        describe('GET /subjects', () => {
            it('should response with 200 and list of subject', () => {
                return request(app.getHttpServer()).get(`${mainRoute}/subjects`).expect(200).expect(findSubjectsResult);
            });
        });
    });

    describe('/orders', () => {
        const mainRoute = '/orders';
        describe('POST /orders', () => {
            it('should response with 201 and object of new order', () => {
                return request(app.getHttpServer())
                    .post(`${mainRoute}`)
                    .send(mockNewOrder)
                    .expect(201)
                    .expect(mockOrder);
            });
            it('should response with 400 Book already borrowed on that date', async () => {
                await request(app.getHttpServer()).post(`${mainRoute}`).send(mockNewOrder);
                return request(app.getHttpServer())
                    .post(`${mainRoute}`)
                    .send(mockNewOrder)
                    .expect(400)
                    .expect({ message: 'Book already borrowed on that date', error: 'Bad Request', statusCode: 400 });
            });
        });

        describe('GET /orders', () => {
            it('should return list of orders', async () => {
                await request(app.getHttpServer()).post(`${mainRoute}`).send(mockNewOrder);

                // mock axios call to open library
                const bookKey = '/works/OL86318W';
                mockedAxios.get.mockImplementation((url) => {
                    if (url.includes(`${bookKey}.json`))
                        return Promise.resolve({ data: findBookByBookKeyHttpResponse });
                    if (url.includes(`${findBookByBookKeyHttpResponse.authors[0].author.key}.json`))
                        return Promise.resolve({ data: findAuthorByKeyHttpResponse });
                });

                return request(app.getHttpServer()).get(`${mainRoute}`).expect(200).expect(findAllOrderResult);
            });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
