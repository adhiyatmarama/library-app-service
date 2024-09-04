import  request from 'supertest';
import axios from 'axios';
import '../../src/module-alias';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { findBooksBySubjectHttpResponse } from '../unit/resources/libs/open-library';
import { findBooksBySubjectResult, findSubjectsResult } from '../unit/resources/books';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });

    describe('/books', () => {
        const mainRoute = '/books'
        describe('GET /subjects/:subject', () => {
            it('should response with 200 and list of books', () => {
                mockedAxios.get = jest.fn().mockResolvedValueOnce({
                    data: findBooksBySubjectHttpResponse
                });
                return request(app.getHttpServer()).get(`${mainRoute}/subjects/photography`).expect(200).expect(findBooksBySubjectResult)
            })
        })

        describe('GET /subjects', () => {
            it('should response with 200 and list of subject', () => {
                return request(app.getHttpServer()).get(`${mainRoute}/subjects`).expect(200).expect(findSubjectsResult)
            })
        })
    })

    afterAll(async () => {
        await app.close();
      });
});
