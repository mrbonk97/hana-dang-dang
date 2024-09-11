"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInApi } from "@/lib/api";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "아이디를 제대로 입력해주세요",
  }),
  password: z.string().min(6, {
    message: "패스워드는 6자 이상입니다.",
  }),
});

const SignInPage = () => {
  const router = useRouter();
  const signIn = createSelectors(store).use.signIn();
  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signInApi(username, password),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) =>
    mutation.mutate(values);

  useEffect(() => {
    if (mutation.isSuccess) {
      signIn(mutation.data.data.user, mutation.data.data.account);
      router.push("/main");
    }
  }, [mutation.isSuccess]);

  return (
    <main className="pt-14 h-full min-h-[700px] flex2 bg-c1-100">
      <div className="h-[90%] w-[80%] max-h-xl flex gap-5 rounded-2xl border shadow-xl bg-background">
        <div className="relative p-5 h-full w-full flex2 border-r">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-bold opacity-80">하나당당 로그인</h1>
            <h2 className="mt-0.5 opacity-60">
              개인정보는 암호화되어 안전하게 보관됩니다.
            </h2>
            <Form {...form}>
              <form
                className="mt-5 space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="opacity-70">아이디</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 tracking-wider"
                          placeholder="hanagalgal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="opacity-70">패드워드</FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 tracking-[0.3rem]"
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-2 pb-4 opacity-70 flex justify-between">
                  <div>
                    <Checkbox id="cb1" />
                    <Label htmlFor="cb1" className="ml-2">
                      아이디 기억하기
                    </Label>
                  </div>
                  <Label>패스워드 찾기</Label>
                </div>
                <div className="space-y-5">
                  <Button
                    type="submit"
                    className="py-6 w-full"
                    disabled={mutation.isPending}
                  >
                    로그인
                  </Button>
                </div>
              </form>
            </Form>

            <p className="mt-5 text-center text-sm">
              계정이 없으시다면{" "}
              <Link
                href={"/sign-up"}
                className="text-custom-300 underline underline-offset-2"
              >
                회원가입
              </Link>
            </p>
            {mutation.isError && (
              <p className="absolute bottom-14 left-1/2 -translate-x-1/2 text-destructive text-sm font-medium opacity-80">
                계정이 존재하지 않거나 패스워드가 잘못되었습니다.
              </p>
            )}
          </div>
        </div>
        <div className="hidden lg:flex h-full w-full items-center justify-center">
          <Image
            src={"/icons/hana.svg"}
            alt="logo"
            width={512}
            height={512}
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;

{
  /* <Button
type="button"
className="py-6 w-full flex items-center gap-2 bg-naver hover:bg-naver hover:opacity-80"
>
<Image
  src={"/icons/naver.png"}
  alt="naver"
  width={20}
  height={20}
/>
네이버로 로그인
</Button>
<Button
type="button"
className="py-6 w-full flex items-center gap-2 bg-kakao text-kakao hover:bg-kakao hover:opacity-80"
>
<Image
  src={"/icons/kakao-talk.png"}
  alt="naver"
  width={20}
  height={20}
/>
카카오로 로그인
</Button>
<Button
type="button"
variant={"secondary"}
className="py-6 w-full flex items-center gap-2"
>
<Image
  src={"/icons/google.png"}
  alt="naver"
  width={20}
  height={20}
/>
구글로 로그인
</Button> */
}
