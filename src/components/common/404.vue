<template>
    <div>
        <div class="http404">
            <div class="bullshit">
                <div>{{ message }}</div>
                <el-button type="primary" @click='returnHome'>返回首页</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        message() {
            return '404'
        }
    },
    methods: {
        returnHome() {
            this.$router.push({
                name: 'index'
            });
        }
    }
}
</script>
<style>

</style>
