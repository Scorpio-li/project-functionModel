/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-05-22 15:46:39
 * @LastEditTime: 2026-05-22 15:55:23
 * @LastEditors: lizhiliang
 * @Usage:
 */
/**
 * 下载文件
 * @param {File} file 二进制文件
 * @param {String} fileName 文件名
 * @param {String} type 文件类型
 */
export const download = (file: File, fileName: string, type: string) => {
  const blob: Blob = new Blob([file], { type: type })
  const url: string = URL.createObjectURL(blob)
  const a: any = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
  a.remove()
}
// 下载图片
export function downloadImage(imgsrc: any, name: string) {
  //下载图片地址和图片名
  const image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context?.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png') //得到图片的base64编码数据
    const a = document.createElement('a') // 生成一个a元素
    const event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.onerror = function () {
    window.open(imgsrc)
  }
  image.src = imgsrc
}

export function downloadImg(imgUrl: string, imgTitle: string) {
    const img = new Image();
    img.src = imgUrl;
    // 必须设置，否则canvas中的内容无法转换为blob
    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx: any = canvas.getContext('2d');
      // 将img中的内容画到画布上
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // 将画布内容转换为Blob
      canvas.toBlob(blob => {
        // blob转为同源url
        const blobUrl = window.URL.createObjectURL(blob);
        // 创建a链接
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = imgTitle || '下载图片'; // 设置图片名称
        // 触发a链接点击事件，浏览器开始下载文件
        a.click();
      });
    };
  }
export function downloadMp4(url: any, title: string, callBack?: any) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'arraybuffer' // 返回类型blob
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const blob = this.response
      const u = window.URL.createObjectURL(new Blob([blob], { type: 'video/mp4' })) // 转换一个blob链接
      const a = document.createElement('a')
      a.href = u
      a.style.display = 'none'
      a.setAttribute('download', title)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      callBack && callBack()
    }
  }
  xhr.send()
}
/**
 * url下载文件
 * @param {Object} res 文件url地址
 */
export function downloadFileUrl(url: any, fileName: string) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.target = '_blank'
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 文件流形式下载
export function fileStreamDownload(url: string, name: string) {
    console.log('fileStreamDownload', url)

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const blob = this.response
            const downloadUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = name
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }
    xhr.send()
}