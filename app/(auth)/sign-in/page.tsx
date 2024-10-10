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
import { signInApi } from "@/lib/user-api";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    onSuccess: (res) => {
      signIn(res.data.user, res.data.account);
      if (window != undefined) {
        const url = sessionStorage.getItem("return_url");
        sessionStorage.removeItem("return_url");
        router.push(url || "/stocks");
      } else router.push("/stocks");
    },
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

  return (
    <main className="py-20 h-full min-h-[700px] flex2 bg-c1-100">
      <article className="h-[700px] w-[1200px] flex gap-5 rounded-2xl border shadow-xl bg-background">
        <section className="relative p-5 h-full w-1/2 flex flex-col items-center border-r">
          <hgroup className="p-5 w-full">
            <h1 className="text-3xl font-bold opacity-75">하나배당당 로그인</h1>
            <h2 className="mt-0.5 opacity-60">
              개인정보는 암호화되어 안전하게 보관됩니다.
            </h2>
          </hgroup>
          <Form {...form}>
            <form
              className="mt-16 flex2 flex-col gap-5 w-full max-w-96"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <FormLabel className="opacity-70">패드워드</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="false"
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
              <div className="mt-5 w-full items-center opacity-70 flex justify-between">
                <div>
                  <Checkbox id="cb1" />
                  <Label htmlFor="cb1" className="ml-2">
                    아이디 기억하기
                  </Label>
                </div>
                <Label className="mt-0.5">패스워드 찾기</Label>
              </div>
              <Button
                type="submit"
                className="mt-4 py-6 w-full"
                disabled={mutation.isPending}
              >
                로그인
              </Button>
            </form>
          </Form>
          <p className="pt-5 text-center text-sm opacity-60 font-medium">
            계정이 없으시다면{" "}
            <Link
              href={"/sign-up"}
              className="text-custom-300 underline underline-offset-2"
            >
              회원가입
            </Link>
          </p>
          {mutation.isError && (
            <p className="absolute bottom-14 left-1/2 -translate-x-1/2 text-destructive text-xs font-medium opacity-80">
              계정이 존재하지 않거나 패스워드가 잘못되었습니다.
            </p>
          )}
        </section>
        <section className="hidden lg:flex h-full w-1/2 items-center justify-center">
          <Image
            src={"/icons/hana.svg"}
            alt="logo"
            width={512}
            height={512}
            className="max-h-96 max-w-96 object-cover"
            priority
          />
        </section>
      </article>
    </main>
  );
};

export default SignInPage;
