module.exports = async promise => {
<<<<<<< HEAD
  try {
    await promise
    assert.fail('Expected revert not received')
  } catch (error) {
    const revertOrAssertFound = error.message.search('revert') >= 0 || error.message.search('assert') >= 0
    assert(revertOrAssertFound, `Expected "revert", got ${error} instead`)
  }
}
=======
    try {
      await promise
      assert.fail('Expected revert not received')
    } catch (error) {
      const revertOrAssertFound = error.message.search('revert') >= 0 || error.message.search('assert') >= 0
      assert(revertOrAssertFound, `Expected "revert", got ${error} instead`)
    }
  }
>>>>>>> origin/feature/11_beneficiary_crud
