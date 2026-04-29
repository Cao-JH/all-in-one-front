export interface BookItem {
  id: number | string
  progress?: string
  bookSourceId: number; // 书源ID
  bookSourceName: string; // 书源名称
  bookName: string; // 书名
  author: string; // 作者
  cover?: string; // 封面URL
  intro?: string; // 简介
  bookUrl?: string; // 详情页URL
  contentsUrl: string; // 目录URL（必需）
  downloadUrl?: string; // 下载URL
  wordCount?: string; // 字数
  lastChapter?: object; // 最新章节
  currentChapter?: object; // 当前章节
  kind?: string; // 分类
}
