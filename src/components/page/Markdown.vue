<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                mavonEditor：基于Vue的markdown编辑器。
                访问地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
            </div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="change" style="min-height: 600px"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data: function(){
            return {
                content:'',
                html:'',
                fileList: [],
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                this.fileList.push({file: $file, index: pos})
                console.log(this.fileList)
                console.log($file)
                console.log(pos)
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                // this.$axios({
                //     url: '/common/upload',
                //     method: 'post',
                //     data: formdata,
                //     headers: { 'Content-Type': 'multipart/form-data' },
                // }).then((url) => {
                //     this.$refs.md.$img2Url(pos, url);
                // })
            },
            $imgDel(pos) {
                console.log(pos)
                console.log(this.fileList)
                this.fileList.forEach((data ,index) => {
                    if(data.index == pos[1]) {
                        this.fileList.splice(index, 1)
                    }
                })
                console.log(this.fileList)
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                // console.log(this.content);
                // console.log(this.html)
                this.$message.success('提交成功！');
                this.$refs.md.removeLine()
                // console.log(this.$refs.md.$refs.toolbar_left.$imgDelByFilename)
                this.$refs.md.$refs.toolbar_left.img_file = []
                // let temp = [this.$refs.md.markdownIt.__image]
                // temp.forEach((data) => {
                //     console.log()
                //     this.$refs.md.markdownIt.image_del(data[0])
                // })
                // this.$refs.md.markdownIt.__image = ''
                console.log(this.$refs.md)
            },
            
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>