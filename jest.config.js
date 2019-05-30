module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    //transform: {
       // '^.+\\.vue$': 'vue-jest',
        //'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        //'^.+\\.js$': 'babel-jest'
    //},
    //setupFiles: ["./src/setupTests.js"],
    
    //testMatch: [
        //'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
        //'.[ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]'
    //],
    testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};