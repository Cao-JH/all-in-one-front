/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 用类名控制夜间模式
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 白天模式中性色（图片基调）
        day: {
          bg: '#FAFAFC', // 主背景
          card: '#FFFFFF', // 卡片背景
          text: '#1F2937', // 主文字（标题/正文）
          textSecondary: '#6B7280', // 次要文字（阅读进度）
          textTertiary: '#9CA3AF', // 新增灰色（辅助文字/分割线）
          border: '#E5E7EB', // 分割线（模块分隔）
        },
        // 夜间模式中性色（护眼适配）
        night: {
          bg: '#121826', // 主背景
          card: '#1E293B', // 卡片背景
          text: '#F9FAFB', // 主文字（浅白）
          textSecondary: '#9CA3AF', // 次要文字
          textTertiary: '#6B7280', // 辅助文字
          border: '#374151', // 分割线
        },
        // 强调色（图片中的黑色按钮）
        primary: {
          DEFAULT: '#000000', // 黑色按钮/强调元素
          light: '#111827', // 按钮悬停态
        },
      },
      // 字体配置
      fontFamily: {
        sans: ['Inter', '阿里巴巴普惠体', 'system-ui', 'sans-serif'],
      },
      // 行高（适配阅读场景）
      lineHeight: {
        title: '1.4', // 大标题
        body: '1.6', // 正文
        read: '1.7', // 阅读正文
      },
      // 圆角（贴合图片卡片圆角）
      borderRadius: {
        book: '8px', // 书籍卡片圆角
        btn: '6px', // 按钮圆角
      },
      // 间距（适配图片布局）
      spacing: {
        book: '16px', // 书籍卡片间距
        nav: '24px', // 导航元素间距
      },
    },
  },
  plugins: [],
}
