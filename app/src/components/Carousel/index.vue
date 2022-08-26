<template>
    <div class="swiper-container" ref="Swipers">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    // 引入Swiper
    import Swiper from 'swiper'
    export default {
        name:'Carousel',
        props:['list'],
        watch:{
            list:{
            // 立即监听：不管数据有没有变化，上来立即监听一次
            // 为什么watch监听不到list：因为数据从来没有发生变化（数据是父亲给的，给的是一个对象，对象里面有数据）
            immediate:true,
                handler(){
                    // 只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定，因此还是需要用nextTick
                    this.$nextTick(()=>{
                        // （本来可以写在mounted钩子中，因为请求时父组件发的，父组件通过pros传递过来的，而且结构都已经有了的情况下执行的mounted，但是为了便于使用全局组价，使其与listContainer保持一致）
                        var mySwiper = new Swiper (this.$refs.Swipers, {
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                // 点击圆点时也可以切换图片
                                clickable:true,
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        })
                    })
                }
            }
        }

    }
</script>

<style>

</style>