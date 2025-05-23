/*
 * @Description: 
 * @Author: Runjie
 * @Date: 2024-12-09 22:53:43
 * @LastEditors: Runjie
 * @LastEditTime: 2024-12-09 22:59:21
 */
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RM 计算器',
  description: '一个简单的最大重复次数(1RM)计算器',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // viewportFit: 'cover', // 可选，如果需要内容延伸到安全区域之外
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="zh" className="light">
      <body className="bg-white">{children}</body>
    </html>
  )
}