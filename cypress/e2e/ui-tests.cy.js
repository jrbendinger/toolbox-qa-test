// Needed to select the appropriate month in the signup form
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// Store values for signup
const first_name = 'Bruce'
const last_name = 'Wayne'

const signup_fields = {
    'password': {
        value: 'thepass',
        type: 'type',
        selector: '[data-qa="password"]',
        required: true
    },
    'first_name': {
        value: first_name,
        type: 'type',
        selector: '[data-qa="first_name"]',
        required: true
    },
    'last_name': {
        value: last_name,
        type: 'type',
        selector: '[data-qa="last_name"]',
        required: true
    },
    'dob': {
        value: new Date(1960, 0, 1),
        type: 'date',
        selector: '[data-qa="dob"]',
        required: false
    },
    'gender': {
        value: 'f',
        type: 'radio',
        selector: '#id_gender',
        required: false
    },
    'company': {
        value: 'Krusty Krab',
        type: 'type',
        selector: '[data-qa="company"]',
        required: false
    },
    'address': {
        value: '1111 Sandy Street',
        type: 'type',
        selector: '[data-qa="address"]',
        required: true
    },
    'address2': {
        value: 'apt 1',
        type: 'type',
        selector: '[data-qa="address2"]',
        required: false
    },
    'country': {
        value: 'United States',
        type: 'select',
        selector: '[data-qa="country"]',
        required: false // set to false because this one can't be empty
    },
    'state': {
        value: 'Hawaii',
        type: 'type',
        selector: '[data-qa="state"]',
        required: true
    },
    'city': {
        value: 'Bikini Bottom',
        type: 'type',
        selector: '[data-qa="city"]',
        required: true
    },
    'zipcode': {
        value: '1234',
        type: 'type',
        selector: '[data-qa="zipcode"]',
        required: true
    },
    'mobile_number': {
        value: '+1 530 153 123',
        type: 'type',
        selector: '[data-qa="mobile_number"]',
        required: true
    },
    'email': {
        value: first_name + last_name + '@gmail.com',
        type: 'email',
        selector: '[data-qa="email"]',
        required: false // set to false because this one can't be cleared
    },
    'newsletter': {
        value: true,
        type: "checkbox",
        selector: '#newsletter',
        required: false
    },
    'optin': {
        value: true,
        type: "checkbox",
        selector: '#optin',
        required: false
    }
}


// I created a function for reusability
function signUp() {
    cy.visit('https://automationexercise.com')
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.get('[data-qa="signup-name"]').type(signup_fields.first_name.value + ' ' + signup_fields.last_name.value)
    cy.get('[data-qa="signup-email"]').type(signup_fields.email.value)
    cy.get('[data-qa="signup-button"]').click()
    // Sometimes if there's been some previous testing, the account already exists
    // Therefore, this function checks that and deletes the account if it exists, and then regresses 
    // to the original signUp() function
    cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('already exist')) {
            cy.get('[data-qa="login-email"]').type(signup_fields.email.value)
            cy.get('[data-qa="login-password"]').type(signup_fields.password.value)
            cy.get('[data-qa="login-button"]').click()
            cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
            cy.contains('account deleted', { matchCase: false })
            cy.get('[data-qa="continue-button"]').click()
            signUp()
        }
    })
}
function getRequiredFields(fields) {
    const required_fields = Object.entries(fields)
    .filter(([_, field]) => field.required)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    return required_fields
}
// A function to fill in the registration fields using a loop, with the ability to filter
// between required and non-required fields
function fillFields(fields) {
    // Loop through all the fields and fill them in
    Object.entries(fields).forEach(([fieldName, fieldData]) => {
        if (fieldData.type === 'type') {
            cy.get(fieldData.selector).type(fieldData.value)
        } else if (fieldData.type === 'select') {
            cy.get(fieldData.selector).select(fieldData.value)
        } else if (fieldData.type === 'radio') {
            if (fieldData.value === 'm') {
            cy.get(fieldData.selector + '1').click()
            // cy.get(fieldData.selector.slice(0, -2) + '1' + fieldData.selector.slice(-2)).click()
            } else if (fieldData.value === 'f') {
            cy.get(fieldData.selector + '2').click()
            }
        } else if (fieldData.type === 'checkbox' && fieldData.value) {
            cy.get(fieldData.selector).click()
        }
        // date of birth is split into three fields, so we handle it differently
        else if (fieldData.type === 'date') {
            cy.get('[data-qa="days"]').select(fieldData.value.getUTCDate().toString())
            cy.get('[data-qa="months"]').select(monthNames[fieldData.value.getMonth()])
            cy.get('[data-qa="years"]').select(fieldData.value.getFullYear().toString())    
        }
        // Don't do anything with the email because this field is locked
        else if (fieldData.type === 'email') {
        }
    })

}
// I created this function because I want to test this case several times with different fields
function failRegistration(){
    cy.get('[data-qa="create-account"]').click()  
    cy.contains('ACCOUNT CREATED!', { matchCase: false }).should('not.exist')
}

// Actual test
describe('Registration flow', () => {
    it('Successfully register new user', () => {
        signUp()
        fillFields(signup_fields,false)
        //Checking that you can select both genders and only one will remain
        cy.get('#id_gender1').click()
        cy.get('#id_gender2').click()
        cy.get('#id_gender1').click()
        // Checking the pre-populated fields are working
        cy.get('[data-qa="name"]').should('have.value', signup_fields.first_name.value + ' ' + signup_fields.last_name.value)
        cy.get('[data-qa="email"]').should('have.value', signup_fields.email.value)
        //select country based on index
        cy.get('[data-qa="country"]').select(1)
        //make sure we can make a new selection
        cy.get('[data-qa="country"]').select(2)
        cy.get('[data-qa="create-account"]').click()
        // Make sure account has been created
        cy.contains('ACCOUNT CREATED!', { matchCase: false })
        cy.get('[data-qa="continue-button"]').click()
    })
    it('Test bad password on login', () => {
    // it('Test bad password on login', () => {
        cy.visit('https://automationexercise.com/login')
        cy.get('[data-qa="login-email"]').type(signup_fields.email.value)
        cy.get('[data-qa="login-password"]').type(signup_fields.password.value + 'bad')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('incorrect', { matchCase: false })
    })
    it('Log into the account and delete it', () => {
    // it('Log into the account and delete it', () => {
        cy.visit('https://automationexercise.com/login')
        cy.get('[data-qa="login-email"]').type(signup_fields.email.value)
        cy.get('[data-qa="login-password"]').type(signup_fields.password.value)
        cy.get('[data-qa="login-button"]').click()
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.contains('ACCOUNT DELETED!', { matchCase: false })
        cy.get('[data-qa="continue-button"]').click()
    })
    it('Test that all required fields must be filled in to register', () => {
        cy.visit('https://automationexercise.com')
        signUp()
        cy.log('Testing required fields validation')
        
        // Use fillFields function to fill in all the required fields
        fillFields(getRequiredFields(signup_fields))

        // Loop again through all the required fields to delete them one by one
        Object.entries(getRequiredFields(signup_fields)).forEach(([fieldName, fieldData]) => {
            cy.log(`Testing submission without ${fieldName} field`)
            // Delete the tested field
            cy.get(fieldData.selector).clear()
            // Try to submit the form
            failRegistration()
            // Fill the tested field back in
            cy.get(fieldData.selector).type(fieldData.value)
        })

        // Once we're done looping through all the fields, we can try and actually submit the form without issues
        cy.get('[data-qa="create-account"]').click()
        cy.contains('ACCOUNT CREATED!', { matchCase: false })
    })
    it('Test bad zip code', () => {
        signUp()
        fillFields(getRequiredFields(signup_fields))
        cy.get('[data-qa="zipcode"]').clear()
        // try a clearly wrong zip code
        cy.get('[data-qa="zipcode"]').type('testing12345678')
        cy.get('[data-qa="create-account"]').click()
        cy.contains('ACCOUNT CREATED!', 'WARNING: Account was created with an invalid zip code', { matchCase: false }).should('not.exist')
    })
    it('Test bad mobile number', () => {
        signUp()
        fillFields(getRequiredFields(signup_fields))
        cy.get('[data-qa="mobile_number"]').clear()
        // try a clearly wrong number
        cy.get('[data-qa="mobile_number"]').type('testing12345678@asd')
        cy.get('[data-qa="create-account"]').click()
        cy.contains('ACCOUNT CREATED!', 'WARNING: Account was created with an invalid mobile number', { matchCase: false }).should('not.exist')
    })
    it('Test bad age', () => {
        signUp()
        fillFields(getRequiredFields(signup_fields))
        // Try a clearly wrong year
        cy.get('[data-qa="years"]').type('1400')
        cy.get('[data-qa="create-account"]').click()
        cy.contains('ACCOUNT CREATED!', 'WARNING: Account was created with an invalid age', { matchCase: false }).should('not.exist')
    })
    it('Test bad password', () => {
        signUp()
        fillFields(getRequiredFields(signup_fields))
        // Try a clearly wrong password
        cy.get('[data-qa="password"]').clear()
        cy.get('[data-qa="password"]').type('a')
        cy.get('[data-qa="create-account"]').click()
        cy.contains('ACCOUNT CREATED!', 'WARNING: Account was created with an invalid password', { matchCase: false }).should('not.exist')
    })
})