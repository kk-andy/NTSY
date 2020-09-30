<template>
    <div>
        <!-- <img :src="mem" alt=""> -->
        <a :href="href" target="_blank">
            <img :src="rightNow" alt="" title="http://www.ebay.com">
        </a>
    </div>
</template>
<script>
// import eabymem from '@/assets/images/eabymember.png'
import eabyrightNow from '@/assets/images/rightnow2.png'
export default {
    name: 'EbayImagesLogo',
    data() {
        return {
            // mem: eabymem,
            rightNow: eabyrightNow,
            href: 'http://www.ebay.com'
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    text-align: center;
    // & > img:nth-child(1) {
    //     width: 150px;
    //     margin-bottom: 30px;
    // }
}
</style>