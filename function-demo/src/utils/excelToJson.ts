// utils/excelToJson.js
import * as XLSX from 'xlsx'

/**
 * Excel 两列数据转 JSON 对象
 * @param {File} file - Excel 文件
 * @param {Object} options - 配置选项
 * @returns {Promise} 返回 JSON 数据
 */
export const excelToJson = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet)
        
        let result
        
        // 根据配置转换数据
        if (options.mode === 'keyValue') {
          // 模式1：转换为键值对对象
          result = keyValueMode(jsonData, options.keyCol, options.valueCol)
        } else if (options.mode === 'array') {
          // 模式2：转换为数组
          result = arrayMode(jsonData, options.keyCol, options.valueCol)
        } else {
          // 默认：转换为对象数组
          result = defaultMode(jsonData)
        }
        
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsArrayBuffer(file)
  })
}

// 键值对模式：{ key1: value1, key2: value2 }
const keyValueMode = (data, keyCol = '字段', valueCol = '值') => {
  const result = {}
  
  data.forEach(row => {
    const key = row[keyCol] || Object.values(row)[0]
    const value = row[valueCol] || Object.values(row)[1]
    result[key] = value
  })
  
  return result
}

// 数组模式：[{ key: 'key1', value: 'value1' }, ...]
const arrayMode = (data, keyCol = '字段', valueCol = '值') => {
  return data.map(row => ({
    key: row[keyCol] || Object.values(row)[0],
    value: row[valueCol] || Object.values(row)[1]
  }))
}

// 默认模式：[{ '列1': '值1', '列2': '值2' }]
const defaultMode = (data) => {
  return data
}

/**
 * 将两列数据转换为对象数组
 * @param {Array} data - Excel 解析的二维数组
 * @returns {Array} 转换后的 JSON 数组
 */
export const twoColumnsToObjectArray = (data) => {
  if (!data || data.length === 0) return []
  
  const result = []
  const headers = data[0]
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const obj = {}
    
    obj[headers[0]] = row[0]
    obj[headers[1]] = row[1]
    
    result.push(obj)
  }
  
  return result
}