import axios from "axios";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DiagnosisResultPage = async ({ params, searchParams }: Props) => {
  const sad = await axios.post("http://localh");
  console.log(params);
  console.log(searchParams);
  return <main></main>;
};

export default DiagnosisResultPage;
