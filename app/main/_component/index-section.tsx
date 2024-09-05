interface SectionProps {
  mode: string;
}

export const IndexSection = ({ mode }: SectionProps) => {
  return (
    <section className="mt-5">
      <h3 className="text-lg font-medium opacity-80">주가지수</h3>
      <div className="mt-2 relative h-60 w-full overflow-hidden">
        <div
          className={`absolute space-y-5 duration-500
      ${mode == "domestic" && "-mt-[16.25rem]"}
      ${mode == "foreign" && "-mt-[32.5rem]"}
        `}
        >
          <section className="flex gap-10">
            <Card title="코스피" />
            <Card title="나스닥" />
          </section>
          <section className="flex gap-10">
            <Card title="코스피" />
            <Card title="코스닥" />
          </section>
          <section className="flex gap-10">
            <Card title="나스닥" />
            <Card title="S&P500" />
          </section>
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
  return (
    <article className="rounded-xl p-5 h-60 w-96 border bg-secondary">
      <h4>{title}</h4>
      <p>대충 그래프</p>
    </article>
  );
};
