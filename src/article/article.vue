<script>
import {ElCard, ElCol, ElRow} from 'element-plus';

export default {
  components: {
    ElCard,
    ElCol,
    ElRow,
  },
  data() {
    return {
      articles: [],  // 初始化为空，因为我们将通过DOM元素填充数据
      bgImage: null,
      pageList: new Set(),
      pageCount: 0,
      currentPage: 1,
    };
  },
  mounted() {
    console.log('mounted called');
    this.bgImg();
    this.fetchArticles();
    this.getPageParam();
    this.makePage();
  },
  methods: {
    // 使用fetch获取API数据（背景图片链接）
    async bgImg() {
      try {
        // 模拟从API获取背景图片
        // const response = await fetch('https://api.btstu.cn/sjbz/api.php');
        // const imageUrl = await response.text();
        // this.bgImage = imageUrl;
        // this.bgImage = "/764594.jpg"
        // // 动态设置整个页面的背景
        // document.body.style.position = "fixed"
        // document.body.style.backgroundImage = `url(${this.bgImage})`;
        // document.body.style.backgroundPosition = 'center'; // 水平居中
        // document.body.style.backgroundSize = 'cover'; // 图片高度填充，宽度自动居中
        // document.body.style.backgroundRepeat = 'no-repeat';  // 不重复背景
        // document.body.style.minHeight = '100vh'; // 确保背景覆盖整个视口高度
      } catch (error) {
        console.error('Failed to fetch background image:', error);
      }

      // fetch('https://api.btstu.cn/sjbz/api.php')
      //     .then((response) => response.text())
      //     .then((url) => {
      //       设置背景图片
      // document.body.style.backgroundImage = `url(${url})`;
      // });
    },
    // 模拟获取文章数据（你可以根据需要更改为从API或其他地方获取数据）
    fetchArticles() {
      if (this.articles.length !== 0) {
        return;
      }
      // 获取所有的postTitle和postSeparator元素
      const postTitles = document.querySelectorAll('.postTitle');
      const postSeparators = document.querySelectorAll('.postSeparator');
      const forFlow = document.querySelector('.forFlow');
      const days = document.querySelectorAll('.day');
      if (
          !forFlow ||
          forFlow.length === 0 ||
          !days ||
          days.length === 0 ||
          !postSeparators ||
          postSeparators.length === 0 ||
          !postTitles ||
          postTitles.length === 0
      ) {
        console.log('Failed to create post');
        if (!forFlow || forFlow.length === 0) console.log('Missing forFlow');
        if (!days || days.length === 0) console.log('Missing or empty days');
        if (!postSeparators || postSeparators.length === 0) console.log('Missing or empty postSeparators');
        if (!postTitles || postTitles.length === 0) console.log('Missing postTitles');
        return;
      }

      // forFlow.insertBefore(topics, days[0]);

      // 遍历每篇文章并动态生成内容

      for (let i = 0; i < postTitles.length; i++) {
        const article = document.createElement('div');
        // 创建一个新的el-card
        // 获取当前文章的开始和结束位置
        const start = postTitles[i];
        const end = postSeparators[i] || null;
        const nextStart = postTitles[i + 1];
        // 复制文章内容到新的el-card
        let currentElement = start;
        // debugger;
        while (currentElement && currentElement !== end && currentElement !== nextStart) {
          const next = currentElement.nextElementSibling;
          if (currentElement.nodeType !== 1) {
            debugger;
            // newDiv.appendChild(currentElement);
          }
          article.appendChild(currentElement);
          currentElement = next;
          const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
          sleep(100);
        }
        // 将新的el-card添加到topicList容器中
        this.articles.push(article.innerHTML);
        // article.clear();
        // break
      }
      // 移除原始的文章元素
      days.forEach((x) => x.remove());
    },
    makePage() {
      // 把博客园的翻页按钮替换成自己的
      const forFlow = document.querySelector('.forFlow');
      const topicListFooterList = forFlow.querySelectorAll('.topicListFooter');
      let flag = false;
      for (const item of topicListFooterList) {
        const aList = item.querySelectorAll('a');
        if (!aList.length) {
          continue;
        }
        aList.forEach((a) => {
          const href = a.getAttribute('href');
          if (href) {
            const match = href.match(/page=(\d+)/);
            if (match) {
              this.pageList.add(match[1]);
              flag = true;
            }
          }
        });
        if (flag) {
          break;
        }
      }
      if (!flag) {
        console.log("没找到任何页面");
        return;
      }
      topicListFooterList.forEach((a) => {
        a.remove();
      })
      // 拿到了页面数据，但是不包含本页。
      this.pageCount = this.pageList.size + 1;
      console.log("页面个数：", this.pageCount);
    },
    handleCurrentChange(newPage) {
      window.location.href = `https://www.cnblogs.com/Timmoc?page=${newPage}`;
    },
    getPageParam() {
      const searchParams = new URLSearchParams(window.location.search);
      const page = searchParams.get('page');
      console.log('Current Page:', page);
      this.currentPage = page ? parseInt(page) : 1;
    }
  },
};
</script>

<template>
  <div id="content" class="app-container">
    <!-- 文章列表 -->
    <el-row :gutter="20">
      <el-col :span="24" class="article-col" v-for="(article, index) in articles" :key="index">
        <el-card class="article-card" v-html="article">
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div id="pager" class="pager">
    <el-pagination
        v-model:current-page="currentPage"
        :page-count="pageCount"
        @current-change="handleCurrentChange"
        background layout="prev, pager, next"
        hide-on-single-page
        size="large"
    />
  </div>
  <div class="footer"></div>
</template>

<style>
#header,.article-card,#pager li,.post::after{
  opacity: 0.86;
}
#content::before, #content.dark::before {
  content: '';
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -2;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: opacity 1.0s ease;
}

#content::before {
  background-image: url("https://img2024.cnblogs.com/blog/3336551/202502/3336551-20250224101149294-230368914.jpg");
}

.dark #content::before {
  background-image: url("https://img2024.cnblogs.com/blog/3336551/202502/3336551-20250224101500166-731070857.jpg");
}


.app-container {
  padding: 1.25rem;
  display: flex;
  flex-direction: column; /* 纵向排列 */
}

.article-col {
  width: 100%; /* 使每个文章项横向占满整个父元素 */
  padding: 1.25rem; /* 保持一些空闲 */
}

.article-card {
  width: 100%;
  padding: 1.25rem ; /* 20px 大致换算为 1.25rem，假设根元素字体大小是 16px */
  box-sizing: border-box;
  /* margin-bottom: 0.625rem; 给每篇文章卡片添加间隔，10px 大致换算为 0.625rem */
  border-radius: 1.25rem !important;
}

#pager {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

#pager li {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.footer {
  padding-bottom: 5rem;
}
.post{
  position: relative;
}
.post::after {
  position: absolute;
  z-index: -1;
  content:"";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ffffff;
  overflow: hidden
}
.dark .post::after {
  background: #202425;
}
</style>
