// 创建script标签
const script___ = document.createElement('script');
// 设置src属性为要引入的JavaScript文件路径
script___.src = 'https://127.0.0.1:5173/src/article/article.js';
script___.type = "module";
// 将script标签添加到文档中，当文档加载完成后会自动加载并执行引入的JavaScript文件
document.body.appendChild(script___);
