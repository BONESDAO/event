"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import "../lib/i18n";

export default function Navbar() {
  const { t, i18n } = useTranslation("navbar");

  const [currentLocale, setCurrentLocale] = useState<string>("zh");
  const [isClient, setIsClient] = useState<boolean>(false);

  // 仅在客户端加载时从 localStorage 获取语言设置
  useEffect(() => {
    setIsClient(true); // 使客户端标识为 true
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedLocale = localStorage.getItem("locale");
      if (savedLocale) {
        setCurrentLocale(savedLocale);
        i18n.changeLanguage(savedLocale); // 确保设置当前语言
      }
    }
  }, [isClient, i18n]); // 当 isClient 或 i18n 变化时触发

  // 语言切换函数
  const switchLanguage = () => {
    const newLocale = currentLocale === "zh" ? "en" : "zh"; // 切换语言
    setCurrentLocale(newLocale); // 更新当前语言状态
    localStorage.setItem("locale", newLocale); // 保存语言到 localStorage
    i18n.changeLanguage(newLocale); // 切换语言
  };

  // 只有在客户端渲染时才显示
  if (!isClient) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-center">
        <div className="mr-4 flex ml-24 flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              {t("Eco-jumping_grid")}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 mr-24">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/leaderboard">{t("leaderboard")}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/rewards">{t("rewards")}</Link>
            </Button>
            <Button variant="ghost" onClick={switchLanguage}>
              {currentLocale === "zh" ? t("english") : t("chinese")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
