import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "next-i18next";
import "@/lib/i18n";
import { useEffect, useState } from "react";

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Payment({ isOpen, onClose }: PaymentProps) {
  const { t, i18n } = useTranslation("payment");
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
  }, [isOpen, i18n, isClient]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>{t("pay_to_play")}</DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
