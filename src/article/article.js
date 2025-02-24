import {createApp} from 'vue'
import App from './article.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果只想导入css变量
import 'element-plus/theme-chalk/dark/css-vars.css'
// import {useDark, useToggle} from "@vueuse/core";

function tryCreateApp_(){
// 创建一个新的容器将组件挂载到里面
    const container = document.querySelector('.forFlow')
    if (container) {
        createApp_(container)
    }else {
        console.log('目标div不存在，等待...');
        // 选择父元素，目标div会添加到这个父元素下
        const home = document.querySelector('#home');
// 创建一个MutationObserver实例
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childNodes') {
                    const div = document.querySelector('.forFlow');
                    if (div) {
                        // div存在时执行的代码
                        console.log('目标div已经存在，开始执行代码');
                        // 可以在这里添加更多要执行的代码
                        createApp_(div)
                        observer.disconnect(); // 找到后停止监听
                    }
                }
            }
        });
        if (!home) {
            console.log('父元素不存在，返回...');
            return
        }
        console.log(home);
        debugger
// 配置观察选项
        const config = { childList: true, subtree: true };
// 开始观察
        observer.observe(home, config);
    }
}
// 自定义insertAfter函数
function insertAfter(newNode, referenceNode) {
    const parent = referenceNode.parentNode;
    if (parent.lastChild === referenceNode) {
        // 如果参考元素是父元素的最后一个子元素，直接使用appendChild
        parent.appendChild(newNode);
    } else {
        // 否则，在参考元素的下一个兄弟元素之前插入新元素
        parent.insertBefore(newNode, referenceNode.nextSibling);
    }
}

function createApp_(parentElement) {
    const app = createApp(App)
    // 如果原有的节点是需要保留的，确保 Vue 只挂载到容器内部
    const vueContainer = document.createElement('div')
    parentElement.appendChild(vueContainer)
    // const top = parentElement.querySelector('#homepage_top_pager')
    // insertAfter(vueContainer,top)
    // app.config.globalProperties.$toggleDark = useToggle(isDark);
    app.use(ElementPlus, {
        // 设置暗黑模式
    })
    app.mount(vueContainer)
}

tryCreateApp_();
// const isDark = useDark();
// export const toggleDark = useToggle(isDark);