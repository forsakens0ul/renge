# 人格特质筛查系统

![版本](https://img.shields.io/badge/版本-1.0.1-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)

基于 DSM-5 标准的人格特质筛查与评估工具，提供快速筛查和完整评估两种模式。

## 📋 功能特点

- **双模式评估**:

  - 快速筛查版(20 题): 评估 3 大特质群，约 10-15 分钟完成
  - 完整评估版(80 题): 评估 10 种人格特质维度，约 25-35 分钟完成

- **科学评估**:

  - 基于 DSM-5 诊断标准设计
  - 多维度特质评估
  - 阈值分析和详细报告

- **用户体验**:

  - 美观直观的 UI 设计
  - 响应式布局，适配手机和桌面
  - 实时评估与数据可视化

- **隐私保护**:
  - 所有数据本地处理，无数据上传
  - 无需注册和个人信息

## 🛠 技术栈

- **前端框架**: React 18 + TypeScript
- **样式**: TailwindCSS + 自定义组件
- **状态管理**: React Hooks
- **图标**: Lucide Icons
- **构建工具**: Vite

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📱 使用指南

### 首页

首页提供两种测试模式选择:

- **快速筛查版**: 20 题，评估 3 大特质群
- **完整评估版**: 80 题，评估 10 种特质维度

### 测试流程

1. 选择测试模式
2. 阅读测试说明及免责声明
3. 按照直觉回答问题
4. 查看评估结果与解读

### 结果解读

结果页面包含:

- 各维度得分及倾向级别
- 详细的特质解释
- 基于得分的专业建议
- 报告下载和分享功能

## 📁 项目结构

```
src/
├── App.tsx            # 主应用组件
├── main.tsx           # 应用入口
├── index.css          # 全局样式
└── data/
    └── traitDescriptions.json  # 特质描述数据
public/
└── data/
    └── wechatQR.jpg   # 微信二维码图片
```

## 📊 数据说明

### 特质维度

完整评估版包含 10 种人格特质维度:

- 偏执型人格特质 (PPD)
- 分裂样人格特质 (SzPD)
- 分裂型人格特质 (STPD)
- 反社会人格特质 (ASPD)
- 边缘型人格特质 (BPD)
- 表演型人格特质 (HPD)
- 自恋型人格特质 (NPD)
- 回避型人格特质 (AvPD)
- 依赖型人格特质 (DPD)
- 强迫型人格特质 (OCPD)

### 评分说明

- 1 分: 完全不符合
- 2 分: 基本不符合
- 3 分: 不确定
- 4 分: 基本符合
- 5 分: 完全符合

## ⚠️ 免责声明

本测试仅用于评估人格特质倾向，**绝不能替代医学诊断**。人格障碍的诊断必须由具备资质的精神科医生或临床心理学家完成。本工具基于 DSM-5 标准设计，但不具备诊断效力。

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出改进建议。请遵循以下流程:

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📜 许可证

本项目采用 MIT 许可证。详见 `LICENSE` 文件。

## 📞 联系方式

- GitHub: [@forsakens0ul](https://github.com/forsakens0ul)
- 网站: [www.chalice.lol](https://www.chalice.lol/)
- 微信公众号: 扫描应用中的二维码关注
