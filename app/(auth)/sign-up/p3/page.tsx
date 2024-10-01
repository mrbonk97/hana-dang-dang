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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { sendSmsVerifyApi } from "@/lib/user-api";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "이름을 정확하게 입력해주세요",
  }),
  carrier: z.string().min(2, {
    message: "통신사를 입력해주세요",
  }),
  mobile_no: z.string().min(2, {
    message: "전화번호를 정확하게 입력해주세요",
  }),
});

const formSchema2 = z.object({
  user_code: z.string(),
});

const SignUpP3Page = () => {
  const [checked, setChecked] = useState(false);
  const setName = createSelectors(store).use.setName();
  const setMobileNo = createSelectors(store).use.setMobileNo();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [time, setTime] = useState(180);

  useEffect(() => {
    if (code != "") setInterval(() => setTime((cur) => cur - 1), 1000);
  }, [code]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      carrier: "",
      mobile_no: "",
    },
  });

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      user_code: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const rs = await sendSmsVerifyApi(values.mobile_no);
    if (rs.status === 200) setTimeout(() => setCode(rs.data.code), 500);
  }

  // 2. Define a submit handler.
  async function onSubmit2(values: z.infer<typeof formSchema2>) {
    if (values.user_code == code) {
      setName(form.getValues("name"));
      setMobileNo(form.getValues("mobile_no"));
      setTimeout(() => router.replace("/sign-up/p4"), 300);
    }
  }

  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">본인 확인</h1>
        <p className="text-sm font-medium opacity-60">
          휴대폰으로 본인 확인을 진행해주세요
        </p>
      </hgroup>
      <section className="flex justify-center">
        <div className="w-[420px] overflow-hidden">
          <div
            className={`pt-16 flex gap-10 duration-500 ${
              code != "" ? "-ml-[430px]" : "ml-[10px]"
            }`}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-shrink-0 w-[400px] space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block opacity-70">실명</FormLabel>
                      <FormControl>
                        <Input placeholder="실명을 입력해주세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="carrier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="opacity-70">휴대폰번호</FormLabel>
                        <FormControl className="hidden">
                          <Input {...field} className="hidden" />
                        </FormControl>
                        <Select
                          onValueChange={(e) => form.setValue("carrier", e)}
                        >
                          <SelectTrigger className="py-6 w-32">
                            <SelectValue placeholder="통신사" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skt">SKT</SelectItem>
                            <SelectItem value="kt">KT</SelectItem>
                            <SelectItem value="lg">LG U+</SelectItem>
                            <SelectItem value="skta">SKT 알뜰폰</SelectItem>
                            <SelectItem value="kta">KT 알뜰폰</SelectItem>
                            <SelectItem value="lga">LG U+ 알뜰폰</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile_no"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="opacity-70">ㅤ</FormLabel>
                        <FormControl>
                          <Input placeholder="전화번호" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="p-4 w-full rounded-lg bg-secondary flex justify-between">
                  <div className="flex items-center gap-2">
                    <FormControl className="h-4 w-4">
                      <Checkbox
                        onCheckedChange={() => setChecked((cur) => !cur)}
                      />
                    </FormControl>
                    <FormLabel className="opacity-70">
                      휴대폰 본인 인증 동의
                    </FormLabel>
                  </div>
                  <ChevronDown className="opacity-50" />
                </div>
                <Button
                  className="py-6 w-full"
                  type="submit"
                  disabled={checked == false}
                >
                  인증번호 받기
                </Button>
              </form>
            </Form>
            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit(onSubmit2)}
                className="flex-shrink-0 w-[400px] space-y-5"
              >
                <FormField
                  control={form2.control}
                  name="user_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between opacity-70">
                        인증번호
                        <span className="opacity-80">유효시간: {time}초</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6자리 인증번호를 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-5 py-6 w-full" type="submit">
                  인증
                </Button>
                <div className="cursor-pointer mt-2 text-xs text-right font-medium opacity-60">
                  재발송
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpP3Page;
