/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-08-31 17:16:14
 * @LastEditTime: 2026-08-31 17:17:20
 * @LastEditors: lizhiliang
 * @Usage: 
 */
module.exports = {
    // 使用 ts-jest 预设
    preset: 'ts-jest',
    // 测试环境：node 或 browser
    testEnvironment: 'node',
    // 测试文件目录
    roots: ['<rootDir>/src'],
    // 测试文件匹配模式
    testMatch: ['**/__tests__/**/*.ts'],
    // 支持的文件扩展名
    moduleFileExtensions: ['ts', 'js', 'json'],
    // 收集覆盖率的文件
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts'  // 排除类型声明文件
    ]
}