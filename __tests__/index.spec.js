const { Matchers, Pact } = require('@pact-foundation/pact');

const { getFoo } = require('../index');


// define constant to avoid sonar violation
const contentTypeKey = 'Content-Type';
const applicationJson = 'application/json';

/**
 * @jest-environment node
 */
describe('Pact', () => {

    let provider;

    const responseContentTypeMatcher = {
        [contentTypeKey]: Matchers.term({
            generate: 'application/json;charset\u003dUTF-8',
            matcher: 'application/json(;\\s?charset\u003d[\\w\\-]+)?',
        }),
    };

    beforeAll(() => {
        provider = new Pact({
            port: 48151,
            log: 'pacts/mockserver-integration.log',
            dir: 'pacts',
            spec: 2,
            consumer: 'foo',
            provider: 'bar',
            cors: true,
            logLevel: 'debug',
        });
        return provider.setup();
    });

    afterAll(() => provider.finalize());

    afterEach(() => provider.verify());

    describe('foo pact', () => {

        const resultMatcher = {
            cancelled: Matchers.somethingLike(false),
            name: Matchers.somethingLike('name'),
            descriptions: Matchers.somethingLike({
                en: Matchers.somethingLike('foo'),
            }),
            complexObject: Matchers.somethingLike({
                value: Matchers.somethingLike('value'),
            }),
        };

        beforeAll(() =>
            provider.addInteraction({
                state: '',
                uponReceiving: 'a request to search for foo',
                willRespondWith: {
                    // matches each entry of the body by type
                    body: {
                        result: Matchers.eachLike(resultMatcher),
                    },
                    headers: {
                        ...responseContentTypeMatcher,
                    },
                    status: 200,
                },
                withRequest: {
                    body: {},
                    headers: {
                        [contentTypeKey]: applicationJson,
                    },
                    method: 'POST',
                    path: '/foo',
                },
            }),
        );

        it('should get foo', () => {
            return getFoo({
                url: provider.mockService.baseUrl,
            })
        });

    });

});
