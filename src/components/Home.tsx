"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWallet } from "@/app/context/WalletContext";
import Abi from "@/contracts/abi.json";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UserAvatar } from "./UserAvatar";
import { useTranslation } from "next-i18next";
import "../lib/i18n";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

// 合约地址
const contractAddress = "0x136595855fda69d63389C9e20863EfC53db982A7";
// 合约Abi
const contractABI = Abi;

const fetchUserData = async (walletAddress: string) => {
  try {
    const response = await fetch(
      `https://api.deworkhub.com/api/users/${walletAddress}`
    );

    // 检查响应是否为 200 OK
    if (!response.ok) {
      console.error(`请求失败，状态码：${response.status}`);
      return null;
    }

    const data = await response.json();

    // 输出原始返回的数据，帮助调试
    console.log("API 返回数据:", data);

    // 如果请求成功并且返回的数据中包含 data 字段，则返回该数据
    if (data.success && data.data) {
      return data.data; // 返回用户数据
    } else {
      console.error("API 返回的数据结构不符合预期:", data);
      return null;
    }
  } catch (error) {
    // 捕获请求异常并输出错误信息
    console.error("请求 API 失败:", error);
    return null;
  }
};

// 添加新用户
const addUserToDatabase = async (walletAddress: string) => {
  const response = await fetch("https://api.deworkhub.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: walletAddress,
      points: 0,
      completed_steps: 0,
      freeAttemptsToday: 1,
      lastResetDate: null,
      RemainingTimes: 0,
    }),
  });
  const data = await response.json();
  return data;
};

export default function HomePage() {
  const { setWalletAddress } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletAddress, setWalletAddressLocal] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalInteractions, setTotalInteractions] = useState(null);
  const { t, i18n } = useTranslation("home");
  const [isClient, setIsClient] = useState<boolean>(false);

  // 仅在客户端加载时从 localStorage 获取语言设置
  useEffect(() => {
    setIsClient(true); // 使客户端标识为 true
  }, []);

  useEffect(() => {
    // 检查连接
    const checkConnection = async () => {
      // 获取contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      try {
        // 获取用户钱包地址
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        // 获取总交互次数
        const total = await _contract.getTotalInteractions();
        setTotalInteractions(total.toString());

        // 获取用户积分
        const user = await fetchUserData(accounts[0]);
        setScore(user.points);

        setContract(_contract); // 将合约保存到本页面
        setWalletAddressLocal(accounts[0]); // 将钱包地址保存到本页面
      } catch (err) {
        console.error(err);
      }
    };
    checkConnection();
    if (isClient) {
      const savedLocale = localStorage.getItem("locale");
      if (savedLocale) {
        i18n.changeLanguage(savedLocale); // 确保设置当前语言
      }
    }
  }, [isClient, i18n, setWalletAddress]);

  // 连接MetaMask
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // 请求连接钱包
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAddress = accounts[0];
        setWalletAddressLocal(userAddress);
        setWalletAddress(userAddress);

        // 查询数据库，获取用户数据
        const user = await fetchUserData(userAddress);

        if (user) {
          // 如果用户存在，获取积分
          setScore(user.points); // 更新为从返回数据中的 `points` 字段
        } else {
          // 如果用户不存在，添加新用户并初始化积分
          await addUserToDatabase(userAddress);
          setScore(0); // 新用户的初始积分为 0
        }
      } catch (error) {
        console.error("连接 MetaMask 失败:", error);
      }
    } else {
      alert("请安装 MetaMask!");
    }
  };

  // 调用 interact() 函数
  const interact = async () => {
    if (contract) {
      try {
        const tx = await contract.interact();
        await tx.wait();
        toast({
          title: "Interact Success",
        });
      } catch (err) {
        toast({ title: `Interact Failed: ${err}` });
      }
    }
  };

  // 只有在客户端渲染时才显示
  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between relative">
      <Card className="flex mt-6 px-6 text-center text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-md text-white">
        Date of event : Jan 27 —— Feb 27
      </Card>
      <div className="flex flex-col absolute top-6 right-6 gap-4 w-72">
        <Card className="flex items-center object-fill">
          <CardContent className="flex p-4 gap-4">
            <UserAvatar address={walletAddress!} size={32} />
            {walletAddress && (
              <div>
                <p>
                  {t("walletAddress")} {walletAddress.slice(0, 6)}...
                  {walletAddress.slice(-4)}
                </p>
                <p>
                  {t("currentScore")} {score}
                </p>
              </div>
            )}
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

      <Card className="fixed flex bottom-4 right-4 p-6 m-2 space-x-4 w-72">
        <div className="flex flex-col justify-center items-center space-y-4">
          <Button
            onClick={interact}
            className="flex w-auto h-8 justify-center items-center"
          >
            {t("checkIn")}
          </Button>
          <Button
            className="flex w-auto h-8 justify-center items-center bg-green-600 text-black"
            disabled
          >
            {t("alreadyCheckedIn_1")} {totalInteractions}{" "}
            {t("alreadyCheckedIn_2")}
          </Button>
        </div>
      </Card>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 justify-center items-center">
          <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
              <motion.h1
                className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t("exploreJourney_1")}
                <span className="text-gradient_indigo-purple">
                  {" "}
                  {t("exploreJourney_2")}
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("exploreDescription")}
              </motion.p>

              <motion.div
                className="space-x-4 flex justify-center mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {!walletAddress === false ? (
                  <Link href={walletAddress ? `/game` : "#"}>
                    <Button
                      variant="outline"
                      size="lg"
                      className={`bg-gradient-to-r from-indigo-500 to-purple-500 text-white ${
                        !walletAddress ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      {t("startGame")}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    onClick={connectMetaMask}
                  >
                    {t("connectWallet")}
                  </Button>
                )}
              </motion.div>

              {walletAddress && (
                <div className="text-green-500 mt-4">
                  {t("walletConnected")}
                </div>
              )}

              {/* 如果钱包未连接，提示用户连接钱包 */}
              {!walletAddress && (
                <div className="text-red-500 mt-4">
                  <p>{t("pleaseConnectWallet")}</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
