module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        'quotes': ['error', 'single'], // 只能单引号（``也被允许）
        'indent': [2, 4], // 4缩进
        // "indent": "off", // 4缩进
        'comma-dangle': 'off', // 对象中的最后一个属性是否需要添加逗号
        'semi': ['error', 'always'], // 必须写分号
        'comma-spacing': ['error', { // 逗号前不能有空格，后必须有空格
            'before': false,
            'after': true
        }],
        'space-before-function-paren': ['warn', { // 函数定义小括号前是否需要空格
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'no-var': 'error',
        'import/first': 'off',
        'eqeqeq': 'off',
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/script-indent': ['warn', 4, { 'baseIndent': 0 }],
        'vue/html-end-tags': 'warn',
        'vue/html-quotes': 'warn',
        'vue/no-spaces-around-equal-signs-in-attribute': 'warn', // 不允许属性赋值左右有空格
        'vue/require-v-for-key': 'off',
    },
}
