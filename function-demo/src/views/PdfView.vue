
<script setup lang="ts">
import dompdf from 'dompdf.js';
import { nextTick, onMounted, ref } from 'vue';

const options = {
    pagination: true,
    format: 'a4',
    pageConfig: {
        header: {
            content: '这是页眉',
            height: 50,
            contentColor: '#333333',
            contentFontSize: 12,
            contentPosition: 'center',
            padding: [0, 0, 0, 0]
        },
        footer: {
            content: '第${currentPage}页/共${totalPages}页',
            height: 50,
            contentColor: '#333333',
            contentFontSize: 12,
            contentPosition: 'center',
            padding: [0, 0, 0, 0]
        }
    }
}

const capture = ref(null)

onMounted(async () => {
    await nextTick()
    console.log('capture', capture.value)
    dompdf(capture.value, options)
        .then((blob: Blob | MediaSource) => {
            console.log('导出成功')
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'example.pdf';
            document.body.appendChild(a);
            a.click();
        })
        .catch((err: any) => {
            console.error('导出失败', err);
        });
});

</script>

<template>
    <div id="capture" ref="capture" style="width: 100px;height: 100px;" foreignObjectRendering>
        <div
            style="width: 50px;height: 50px;border: 1px solid #000;box-shadow: 2px 2px 5px rgba(0,0,0,0.3);background: linear-gradient(45deg, #ff6b6b, #4ecdc4);"
        >
            这是一个div元素
        </div>
    </div>
</template>
