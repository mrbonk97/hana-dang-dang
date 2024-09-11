"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { api } from "@/lib/api";
import { useState } from "react";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "6자 이상으로 입력해주세요" })
      .max(20, { message: "20자 이하로 입력해주세요" }),
    password: z
      .string()
      .min(6, { message: "6자 이상으로 입력해주세요" })
      .max(20, { message: "20자 이하로 입력해주세요" }),
    confirmPassword: z
      .string()
      .min(6, { message: "6자 이상으로 입력해주세요" })
      .max(20, { message: "20자 이하로 입력해주세요" }),
    isVerified: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "패스워드가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

const SignUpP5Page = () => {
  const router = useRouter();
  const name = createSelectors(store).use.name();
  const mobileNo = createSelectors(store).use.mobileNo();

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const checkDuplicate = async () => {
    setIsDuplicate(null);
    const rs = await form.trigger("username");
    if (!rs) return;

    setTimeout(() => setIsDuplicate(false), 500);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("히히요");
    if (isDuplicate == null) {
      setErrorMessage("아이디 중복검사를 해주세요");
      return;
    }
    if (isDuplicate == true) {
      setErrorMessage("다른 아이디를 입력해주세요");
      return;
    }
    setErrorMessage("");

    const result = await api.post("/users", {
      name: name,
      mobileNo: mobileNo,
      username: values.username,
      password: values.password,
    });

    if (result.status == 200) {
      sessionStorage.setItem("name", result.data.user.name);
      sessionStorage.setItem("username", result.data.user.username);
      sessionStorage.setItem("account_no", result.data.account.accountNo);
      router.replace("/sign-up/success");
    }
  }

  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">계정 생성</h1>
        <p className="text-sm font-medium opacity-60">
          계좌에 연동할 계정을 만들어주세요
        </p>
      </hgroup>
      <section className="mt-16 flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[400px] space-y-5"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="opacity-70">아이디</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="hana123" {...field} />
                    </FormControl>
                    <Button
                      onClick={() => checkDuplicate()}
                      type="button"
                      variant={"outline"}
                      className="py-6"
                    >
                      중복확인
                    </Button>
                  </div>
                  <FormMessage />
                  {isDuplicate == false && (
                    <div className="text-[0.8rem] font-medium opacity-70 text-blue-500">
                      사용해도 좋은 아이디입니다.
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block opacity-70">패스워드</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * * * * * *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block opacity-70">
                    패스워드 확인
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * * * * * *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="py-6 w-full" type="submit">
              회원가입
            </Button>
            <p className="text-center text-sm font-medium text-destructive opacity-70">
              {errorMessage}
            </p>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default SignUpP5Page;
