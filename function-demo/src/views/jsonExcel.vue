<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-04-17 10:44:55
 * @LastEditTime: 2026-04-17 14:26:26
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <div class="i18n-converter">
    <h3>国际化数据转换工具</h3>

    <!-- JSON 输入区域 -->
    <div class="section">
      <h4>输入 JSON 数据：</h4>
      <el-input
        type="textarea"
        v-model="jsonInput"
        :rows="8"
        placeholder='{
    "mso.geofences": "Geofences",
    "mso.create.group": "Create Group",
    "mso.create.fence": "Create Geofence"
  }'
      />
    </div>

    <!-- 转换按钮 -->
    <div class="section">
      <el-button type="primary" @click="exportToExcel"> 导出为 Excel（两列） </el-button>
      <el-button type="success" @click="exportWithCustomNames"> 导出（自定义列名） </el-button>
    </div>

    <!-- Excel 上传区域 -->
    <div class="section">
      <h4>上传 Excel 文件：</h4>
      <el-upload :before-upload="handleExcelUpload" accept=".xlsx, .xls" :show-file-list="false">
        <el-button type="primary">导入 Excel 文件</el-button>
      </el-upload>
    </div>

    <!-- 转换结果 -->
    <div class="section" v-if="excelResult">
      <h4>转换结果：</h4>
      <pre>{{ JSON.stringify(excelResult, null, 2) }}</pre>
      <el-button type="success" @click="copyToClipboard"> 复制 JSON </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const jsonInput = ref(`{
    "mso.geofences": "Geofences",
    "mso.create.group": "Create Group",
    "mso.create.fence": "Create Geofence"
  }`)

const excelResult = ref(null)

// JSON 转 Excel
const exportToExcel = () => {
  try {
    // 解析 JSON
    const jsonData = JSON.parse(jsonInput.value)

    // 转换为两列格式
    const twoColumnData = Object.entries(jsonData).map(([key, value]) => ({
      Key: key,
      Value: value,
    }))

    // 创建工作簿
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(twoColumnData)

    // 设置列宽
    worksheet['!cols'] = [
      { wch: 35 }, // Key 列宽度
      { wch: 35 }, // Value 列宽度
    ]

    // 添加工作表
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Translations')

    // 导出
    XLSX.writeFile(workbook, `translations_${Date.now()}.xlsx`)
    alert('导出成功')
  } catch (error) {
    alert('JSON 格式错误')
    console.error(error)
  }
}

// 自定义列名导出
const exportWithCustomNames = () => {
  try {
    const jsonData = JSON.parse(jsonInput.value)

    const twoColumnData = Object.entries(jsonData).map(([key, value]) => ({
      '英文键(English Key)': key,
      '中文值(Chinese Value)': value,
    }))

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(twoColumnData)
    worksheet['!cols'] = [{ wch: 40 }, { wch: 40 }]

    XLSX.utils.book_append_sheet(workbook, worksheet, '国际化配置')
    XLSX.writeFile(workbook, `i18n_${Date.now()}.xlsx`)
    alert('导出成功')
  } catch (error) {
    console.error(error)
    alert('JSON 格式错误')
  }
}

// Excel 转 JSON
const handleExcelUpload = (file: Blob) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e?.target?.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const excelData = XLSX.utils.sheet_to_json(firstSheet)

      // 转换为 JSON 对象
      const jsonObject = {}
      excelData.forEach((row) => {
        const keys = Object.keys(row)
        if (keys.length >= 2) {
          const key = row[keys[0]]
          const value = row[keys[1]]
          if (key && value) {
            jsonObject[key] = value
          }
        }
      })

      excelResult.value = jsonObject
      alert('转换成功')
    } catch (error) {
        alert('文件解析失败')
      console.error(error)
    }
  }

  reader.readAsArrayBuffer(file)
  return false
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(excelResult.value, null, 2))
    alert('已复制到剪贴板')
  } catch (error) {
    console.error(error)
    alert('复制失败')
  }
}
</script>

<style scoped>
.i18n-converter {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
}

.section {
  margin-bottom: 24px;
  color: black;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

h4 {
  margin-bottom: 10px;
  color: #666;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  max-height: 300px;
}
</style>
