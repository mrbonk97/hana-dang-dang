interface SectionProps {
  mode: string;
}

export const NewsSection = ({ mode }: SectionProps) => {
  return (
    <section className="mt-10">
      <h3 className="text-lg font-medium opacity-80">주가뉴스</h3>
      <div className="mt-2 bg-rose-200">
        <div
          className={`flex gap-5 duration-500
            ${mode == "domestic" && "-ml-[21.25rem]"}
            ${mode == "foreign" && "-ml-[42.5rem]"}`}
        >
          <AllNews />
          <DomesticNews />
          <ForeignNews />
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
}

const AllNews = () => {
  return (
    <div className="flex gap-5">
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
    </div>
  );
};

const DomesticNews = () => {
  return (
    <div className="flex gap-5">
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
    </div>
  );
};

const ForeignNews = () => {
  return (
    <div className="flex gap-5">
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
      <Card title="中, 주택담보대출 금리 0.8%포인트 파격 인하하나" />
    </div>
  );
};

const Card = ({ title }: CardProps) => {
  return (
    <article className="rounded-xl p-5 h-60 w-80 border bg-secondary">
      <h4>{title}</h4>
      <p>대충 그래프</p>
    </article>
  );
};
