<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委派 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 + 过渡动画-->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex===index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a 
                                        :data-categoryName="c1.categoryName" 
                                        :data-category1Id="c1.categoryId"
                                        >{{c1.categoryName}}
                                    </a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.category">
                                        <dl class="fore">
                                            <dt>
                                                <a 
                                                    :data-categoryName="c2.categoryName" 
                                                    :data-category2Id="c2.categoryId"
                                                    >{{c2.categoryName}}
                                                </a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a 
                                                        :data-categoryName="c3.categoryName" 
                                                        :data-category3Id="c3.categoryId"
                                                        >{{c3.categoryName}}
                                                    </a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // 引入方式：按需加载
    import throttle from 'lodash/throttle'
    export default {
        name:'TypeNav',
        data() {
            return {
                currentIndex:-1,
                show:true,
            }
        },
        // 组件挂载完毕，可以向服务器发请求
        mounted() {
            // 当组件挂载完毕，让show属性变为false
            // 如果不是Home路由组件，将TypeNav进行隐藏
            if(this.$route.path!='/home')
                this.show=false
        },
        computed: {
            ...mapState({
                // 使用对象写法时，右侧需要的是一个函数，当使用这个计算属性时，右侧的函数会立即执行一次
                // 注入一个参数：大仓库中的数据
                categoryList:(state)=>{
                    return  state.home.categoryList
                }
            })
        },
        methods: {
            // 鼠标进入修改响应式数据currentIndex属性（开启节流，此时使用对象式写法）  
            // 注意：throttle回调函数别用箭头函数，可能出现上下文this
            changeIndex:throttle(function(index) {
                this.currentIndex=index
            },50),
            // 进行路由跳转的回调函数
            goSearch(event){
                // 编程式导航+事件的委派
                // 利用事件委派存在的问题：1.怎么确定点击的一定是a标签 2.如何获取参数【1、2、3级分类的产品的名字、id】
                // 解决方法：1.把子节点当中的a标签，加上自定义属性data-categoryName，其余的子节点是没有的
                let node=event.target
                // 获取到当前触发这个事件的节点，需要带有data-catagoryname（浏览器默认小写）这样的节点一定是a标签
                // 节点有一个dataset属性，可以获取到节点的自定义属性和属性值
                let{
                    categoryname,
                    category1id,
                    category2id,
                    category3id
                    }= node.dataset
                // 如果标签身上有data-catagoryname则一定是标签
                if(categoryname){
                    // 1.整理路由跳转的参数
                    let location={name:'search'}
                    let query={categoryName:categoryname}
                    // 一级分类、二级分类、三级分类的a标签
                    if(category1id){
                        query.category1Id=category1id
                    }else if(category2id){
                        query.category2Id=category2id
                    }else{
                        query.category3Id=category3id
                    }
                    // 判断：如果路由跳转的时候，带有params参数，也需要捎带着传递过去
                    if(this.$route.params){
                        // 2.整理完参数
                        location.params=this.$route.params
                        location.query=query
                        // 3.路由的跳转
                        this.$router.push(location)
                    }

                }
            },
            // 当鼠标移入的时候，让商品分类列表进行展示
            enterShow(){
                this.show=true
            },
            // 当鼠标移出的时候，让商品分类列表进行隐藏
            leaveShow(){
                this.currentIndex=-1
                // 判断如果是Search路由组件的时候才会执行
                if(this.$route.path!='/home'){
                    this.show=false
                }

            }
        },
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            // 过渡动画的样式
            // 过渡动画的开始状态（进入）
            .sort-enter{
                height: 0px;
            }
            // 过渡动画的结束状态（进入）
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画时间、速率
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>