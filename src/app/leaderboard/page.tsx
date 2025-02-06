"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useTranslation } from "next-i18next";
import "@/lib/i18n";

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
};

type User = {
  address: string;
  points: number;
};

export default function LeaderboardPage() {
  const { t, i18n } = useTranslation("leaderboard");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // 仅在客户端加载时从 localStorage 获取语言设置
  useEffect(() => {
    setIsClient(true); // 使客户端标识为 true
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedLocale = localStorage.getItem("locale");
      if (savedLocale) {
        i18n.changeLanguage(savedLocale); // 确保设置当前语言
      }
    }

    // 请求排行榜数据
    const fetchLeaderboardData = async () => {
      try {
        // 获取用户列表
        const usersResponse = await fetch(
          "https://api.deworkhub.com/api/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const usersData = await usersResponse.json();

        if (usersData.success && usersData.data) {
          // 获取用户地址和积分数据
          const users = usersData.data.map((user: User) => ({
            address: user.address,
            points: user.points,
          }));

          // 根据积分排序用户
          const sortedUsers = users.sort(
            (a: User, b: User) => b.points - a.points
          );

          // 格式化数据并更新 state
          const leaderboardData = sortedUsers.map(
            (user: User, index: number) => ({
              rank: index + 1, // 排名
              username: user.address, // 用户名即为地址
              score: user.points, // 积分
            })
          );

          setLeaderboard(leaderboardData);
        } else {
          console.error("获取用户数据失败", usersData);
        }
      } catch (error) {
        console.error("获取用户数据失败:", error);
      }
    };

    fetchLeaderboardData();
  }, [i18n,isClient]);

  // 只有在客户端渲染时才显示
  if (!isClient) return null;

  return (
    <div className="container mx-auto p-4 relative">
      <Card className="flex absolute top-6 right-6 items-center px-4 py-2">
        <Link href={"/game"}>{t("back_to_game")}</Link>
      </Card>
      <h1 className="text-3xl font-bold mb-4">{t("leaderboard")}</h1>
      <Table>
        <TableCaption>{t("real_time_ranking")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("ranking")}</TableHead>
            <TableHead>{t("avatar")}</TableHead>
            <TableHead>{t("username")}</TableHead>
            <TableHead>{t("score")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell>{entry.rank}</TableCell>
              <TableCell>
                <UserAvatar address={entry.username} size={32}></UserAvatar>
              </TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
