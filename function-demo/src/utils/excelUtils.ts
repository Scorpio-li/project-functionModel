/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-04-17 10:46:45
 * @LastEditTime: 2026-04-17 11:23:05
 * @LastEditors: lizhiliang
 * @Usage: 
 */

// utils/excelUtils.js
import * as XLSX from 'xlsx'

/**
 * 将 JSON 数据转成 Excel 的两列
 * @param {Array} data - JSON 数据数组
 * @param {string} col1Name - 第一列名称
 * @param {string} col2Name - 第二列名称
 * @param {string} fileName - 下载的文件名
 */
export const jsonToExcel = (data: any, col1Name = '列1', col2Name = '列2', fileName = 'data.xlsx') => {
  // 将 JSON 数据转换为两列格式
  const worksheetData = data.map((item: any) => ({
    [col1Name]: item.key || item[col1Name] || Object.keys(item)[0],
    [col2Name]: item.value || item[col2Name] || Object.values(item)[0]
  }))
  
  // 创建工作簿和工作表
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  
  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  
  // 导出 Excel
  XLSX.writeFile(workbook, fileName)
}