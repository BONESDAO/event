// src/i18n.ts (或者 src/i18n.js)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(initReactI18next) // 连接 react-i18next
  .use(HttpBackend) // 使用 HTTP 后端加载翻译文件
  .init({
    lng: "zh", // 默认语言
    fallbackLng: "zh", // 回退语言
    interpolation: {
      escapeValue: false, // React 已经默认转义HTML，避免二次转义
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // 这里配置翻译文件路径
    },
  });

export default i18n;
