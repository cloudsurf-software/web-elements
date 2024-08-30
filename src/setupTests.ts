import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// Example: Setting up a global variable (if needed)
// globalThis.myGlobalVariable = 'someValue';
