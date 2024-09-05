"use client";
import { useState } from "react";
import { MenuSection } from "./_component/menu-section";
import { IndexSection } from "./_component/index-section";
import { NewsSection } from "./_component/news-section";
import { StockSection } from "./_component/stock-section";

const MainPage = () => {
  const [mode, setMode] = useState("all");
  return (
    <main className="min-h-full h-full pt-14 flex">
      <section className="px-10 w-full">
        <MenuSection mode={mode} setMode={setMode} />
        <IndexSection mode={mode} />
        <NewsSection mode={mode} />
      </section>
      <StockSection />
    </main>
  );
};

export default MainPage;
