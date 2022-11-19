// Setup for the entire suit.
global.beforeAll((done) => {
  // console.log('BEFORE ALL')
  done()
})

// Teardown for the entire suit.
global.afterAll((done) => {
  // console.log('AFTER ALL')
  done()
})

// Setup before each spec
global.beforeEach((done) => {
  // console.log('BEFORE EACH')
  done()
})

// Teardown after each spec.
global.afterEach((done) => {
  // console.log('AFTER EACH')
  done()
})
