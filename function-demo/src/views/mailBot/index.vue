<template>
  <div>
    邮件发送测试
    <section class="mail-send">
        <el-input v-model="text" placeholder="请输入邮件内容"></el-input>
        <el-button @click="sendMail">发送邮件</el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const nodemailer = require("nodemailer");
// import nodemailer from 'nodemailer';

const text = ref('');
const sendMail = async() => {
    const user = "1075788918@qq.com"; //自己的邮箱
    const pass = "wrxnawehixasijfg"; //qq邮箱授权码,如何获取授权码下面有讲
    const to = "lzl102872@163.com"; //对方的邮箱
    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
            user: user, // 用户账号
            pass: pass, //授权码,通过QQ获取
        },
    });

    const info = await transporter.sendMail({
        from: `亲爱的老公<${user}>`, // sender address
        to: `亲爱的老婆<${to}>`, // list of receivers
        subject: "亲爱的老婆", // Subject line
        text: text.value, // plain text body
    });
    console.log("发送成功", info);
}
</script>

<style lang="css" scoped>

</style>