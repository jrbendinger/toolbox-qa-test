describe('Echo Server API Requests', () => {
    // define the base URL for the API
    const BASE_URL = 'https://echo-serv.tbxnet.com/v1'
    // define a limit for the request time in milliseconds
    const max_duration = 3000
    // define request text
    const request_text = 'Testing echo server GET request'
    
    // Test GET request
    it('Testing Successful GET request', () => {
        cy.request('GET', `${BASE_URL}/echo?text=${request_text}`)
          .should((response) => {
            expect(response.status, 'Status should be equal to 200').to.eq(200)
            expect(response.duration, 'Response should be less than 3 seconds').to.be.lessThan(max_duration)
            expect(response.body.text, 'Response text should match request text').to.eq(request_text)
            expect(response, 'Response should have headers').to.have.property('headers')
            expect(response.headers, 'Content-Type header should be present').to.have.property('content-type')
            expect(response.headers, 'Connection header should be present').to.have.property('connection')
            expect(response.headers, 'Date header should be present').to.have.property('date')
            expect(+response.headers['content-length'], 'The header content-length should match the length of the response body').to.be.eq(JSON.stringify(response.body).length)
          })
    })
    // Send a GET request to a non-existent endpoint
    it('Testing non-existent endpoint', () => {
        // We have to use an object to prevent the test from failing after getting a failure status code
        cy.request(
            {method: 'GET',
            url: `${BASE_URL}/v1/qa/bad-endpoint?text=${request_text}`,
            failOnStatusCode: false}
        ).should((response) => {
          expect(response.status, 'Should be not found').to.eq(404)
          expect(response.body, 'We need to get an object in response').to.be.an('object')
          expect(response.body, 'The response body should have the code and it should be 404').to.have.property('status', 404)
          expect(response.body, 'The response body should have the message and it should be not found').to.have.property('message', 'Not Found')
          expect(response.headers, 'Content-Type header should be present').to.have.property('content-type')
          expect(response.headers, 'Connection header should be present').to.have.property('connection')
          expect(response.headers, 'Date header should be present').to.have.property('date')
        })
    })
    it('Testing requested error code 599', () => {
        cy.request(
            {method: 'GET',
            url: `https://echo-serv.tbxnet.com/v1/echo?text=${request_text}&errorCode=599`,
            failOnStatusCode: false}
        ).should((response) => {
          expect(response.status, 'Should be not found').to.eq(599)
          expect(response.body, 'We need to get an object in response').to.be.an('string')
          expect(response.headers, 'Content-Type header should be present').to.have.property('content-type')
          expect(response.headers, 'Connection header should be present').to.have.property('connection')
          expect(response.headers, 'Date header should be present').to.have.property('date')
        })
    })
    // The endpoint is suspected to be behaving as a GET endpoint, so it doesn't accept a body like a POST endpoint
    it('Suspected POST endpoint acting as GET endpoint', () => {
        cy.request(
            {
                method: 'POST',
            url: `${BASE_URL}/echo?text=queryText`, // Note the text being sent through the query
            body: {"text": "bodyText"} // Note the text being sent through the body
            }
        ).should((response) => {
        expect(response.status, 'Status should be equal to 200').to.eq(200)
        expect(response.body.text, 'Response text should match the text sent in the POST body, not in the query').to.eq('bodyText')
        })
    })
})