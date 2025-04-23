# Dijkstra算法可视化学习

## 项目简介

这是一个交互式的Dijkstra算法学习项目,可[在线预览](https://fate-ui.github.io/learn-dijkstra-algorithm-online/#/home)，通过图形化界面和逐步演示，帮助你轻松理解Dijkstra最短路径算法的工作原理。

### 🌟 核心特点

- **可视化展示**：以动态图形方式展示算法每一步的执行过程
- **交互式学习**：通过点击"下一步"按钮，控制算法的执行步骤
- **详细步骤说明**：右侧面板实时显示每一步的执行逻辑
- **直观的节点状态**：通过不同颜色标记当前节点、已关闭节点和路径
- **自定义起终点**：可以自由设置起点和终点，观察不同路径的寻路过程

## 项目演示

![项目演示](public/demo.gif)

## 使用指南

1. 启动项目后，界面会显示一个默认的图形网络
2. 点击"下一步"按钮，观察算法的执行过程
3. 右侧文本区域会实时显示每一步的执行说明
4. 点击"重置"按钮可以重新开始算法演示
5. 点击右上角的配置按钮，可以选择自定义起点和终点

算法源码位于：`src/views/NavigateRoute.ts` [跳转](src/views/NavigateRoute.ts)

## 参考资料

- [知乎：A-Star（A\*）寻路算法原理与实现](https://zhuanlan.zhihu.com/p/385733813)
- [B站：【算法】最短路径查找—Dijkstra算法](https://www.bilibili.com/video/BV1zz4y1m7Nq/?spm_id_from=333.337.search-card.all.click&vd_source=c21dc7a2f93289c8e3df1bde97f015b9)

## 项目启动

1. 克隆代码

```bash
git clone https://github.com/Fate-ui/learn-dijkstra-algorithm-online.git
cd learn-dijkstra-algorithm-online
```

2. 安装依赖

项目是在pnpm下开发的，如果没有安装pnpm，可以使用npm或者yarn代替。如若报错，请[安装pnpm](https://www.pnpm.cn/installation)后尝试。

```bash
pnpm install
```

3. 启动项目

```bash
pnpm run dev
```

4. 打包项目

```bash
pnpm run build
```

## 技术栈

本项目采用现代前端技术栈构建：

- **核心框架**：Vue 3 (组合式API) + TypeScript
- **构建工具**：Vite (快速的开发体验)
- **状态管理**：Pinia (Vue官方推荐的轻量级状态管理)
- **UI组件**：Element Plus (流行的Vue 3 UI组件库)
- **CSS工具**：UnoCSS (原子化CSS工具)
- **地图绘制**：Leaflet (轻量级交互式地图库)
- **实用工具**：VueUse (Vue组合式API工具集)

