"use client";

import { useState, useEffect } from "react";
import JumpingGame from "@/components/JumpGame";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import { useTranslation } from "next-i18next";
import "@/lib/i18n";

const fetchUserScore = async (walletAddress: string) => {
  try {
    const response = await fetch(
      `https://api.deworkhub.com/api/users/${walletAddress}`
    );
    const data = await response.json();
    if (data.success && data.data) {
      return data.data.points; // 返回积分
    }
    return 0;
  } catch (error) {
    console.error("获取用户积分失败:", error);
    return 0;
  }
};

// 获取用户免费次数
const fetchUserFreeAttempts = async (walletAddress: string) => {
  try {
    const response = await fetch(
      `https://api.deworkhub.com/api/users/${walletAddress}`
    );
    const data = await response.json();
    if (data.success && data.data) {
      const { freeAttemptsToday } = data.data;
      return freeAttemptsToday; // 返回免费次数
    }
    return 0;
  } catch (error) {
    console.error("获取用户免费次数失败:", error);
    return 0;
  }
};

// 更新用户最新登录时间的函数
const updateUserLastLoginTime = async (walletAddress: string) => {
  try {
    // 获取当前日期，格式为 YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0]; // 获取当前日期部分

    // 确保传递的参数没有 undefined
    const body = {
      address: walletAddress,
      lastResetDate: currentDate || null, // 如果 currentDate 没有值，则传递 null
    };

    // 打印请求体进行调试
    console.log("Request Body:", body);

    const response = await fetch(
      `https://api.deworkhub.com/api/users/${walletAddress}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: walletAddress,
          lastResetDate: currentDate, // 仅传递日期部分
        }),
      }
    );

    const data = await response.json();
    console.log("Response Data:", data); // 打印返回的 JSON 数据

    if (response.ok) {
      if (data.success) {
        console.log("用户登录时间更新成功:", data);
      } else {
        throw new Error("更新登录时间失败");
      }
    } else {
      throw new Error("更新登录时间失败!");
    }
  } catch (error) {
    console.error("更新登录时间失败:", error);
  }
};

export default function GamePage() {
  const { walletAddress } = useWallet();
  const [score, setScore] = useState(0);
  const [freeAttemptsToday, setFreeAttemptsToday] = useState(0);
  const [remainingTimes, setRemainingTimes] = useState(0);
  const { t, i18n } = useTranslation("gamepage");
  const [isClient, setIsClient] = useState<boolean>(false);

  // 仅在客户端加载时从 localStorage 获取语言设置
  useEffect(() => {
    setIsClient(true); // 使客户端标识为 true
  }, []);

  useEffect(() => {
    

    if (walletAddress) {
      const getScore = async () => {
        const userScore = await fetchUserScore(walletAddress);
        setScore(userScore);
      };
      const getFreeAttempts = async () => {
        const freeAttempts = await fetchUserFreeAttempts(walletAddress);
        setFreeAttemptsToday(freeAttempts);
      };

      const getRemainingTimes = async () => {
        const response = await fetch(
          `https://api.deworkhub.com/api/users/${walletAddress}`
        );
        const data = await response.json();
        if (data.success && data.data) {
          setRemainingTimes(data.data.RemainingTimes + freeAttemptsToday); // 更新剩余次数
        }
      };

      const updateLoginTime = async () => {
        await updateUserLastLoginTime(walletAddress); // 更新登录时间
      };
      getScore();
      getFreeAttempts();
      getRemainingTimes();
      updateLoginTime();
    }
  }, [walletAddress, freeAttemptsToday, i18n, isClient]);

   // 只有在客户端渲染时才显示
   if (!isClient) return null;

  return (
    <div className="relative flex items-center justify-center min-h-[93vh] bg-gray-100 px-4 bg-[url('/backgroud.png')] bg-cover bg-center bg-no-repeat">
      <main className="flex-1 container py-6">
        <motion.div
          className="grid gap-6 lg:grid-cols-[1fr_300px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1 ml-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {t("game_title")}
              </h1>
              <p className="text-muted-foreground">{t("game_description")}</p>
            </div>
            <JumpingGame
              score={score}
              freeAttemptsToday={freeAttemptsToday}
              onScoreChange={setScore}
              onFreeAttemptsChange={setFreeAttemptsToday}
              onRemainingTimesChange={setRemainingTimes}
            />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("game_status")}</CardTitle>
                <CardDescription>{t("current_game_status")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("current_score")}
                    </span>
                    <span className="font-bold">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("remaining_times")}
                    </span>
                    <span className="font-bold">{remainingTimes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("free_attempts_today")}{" "}
                      <span className="font-bold text-green-500">
                        {freeAttemptsToday}
                      </span>{" "}
                      {t("times_left")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("game_instructions")}</CardTitle>
                <CardDescription>{t("game_rules")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                  <li>{t("dice_button_instruction")}</li>
                  <li>{t("free_attempts_instruction")}</li>
                  <li>{t("special_tile_instruction")}</li>
                  <li>{t("normal_tile_instruction")}</li>
                  <li>{t("win_instruction")}</li>
                  <li>{t("reward_instruction")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
