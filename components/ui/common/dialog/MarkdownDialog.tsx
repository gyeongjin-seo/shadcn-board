"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
// Components
import LabelCalendar from "../calendar/LabelCalendar";
import MDEditor from "@uiw/react-md-editor";
// Shadcn
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// CSS
import styles from "./MarkdownDialog.module.scss";

function MarkdownDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string | undefined>(
    "**Hello, world!!**",
  );

  // ==============================================

  // Supabase에 저장
  const onSubmit = async () => {
    console.log("함수 호출");

    if (!title || !content) {
      toast("기입되지 않은 데이터(값)가 있습니다.", {
        description: "제목, 날짜 혹은 콘텐츠 값을 모두 작성해주세요",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    } else {
      const { data, error, status } = await supabase
        .from("todos")
        .insert([
          {
            title: title,
            content: content,
          },
        ])
        .select();

      if (error) {
        console.log(error);
        toast("에러가 발생했습니다.", {
          description: "콘솔 창에 출력된 에러를 확인하세요",
        });
      }
      if (status === 201) {
        toast("생성 완료!", {
          description: "작성한 글이 Supabase에 올바르게 저장되었습니다.",
        });

        // 등록 후 조건 초기화
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button
          variant={"ghost"}
          className="font-normal text-gray-400 hover:text-gray-500 cursor-poiner"
        >
          Add Contents
        </Button> */}
        <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Contents
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-fit">
        {/* Tailwind에서는 그냥 max-w-fit을 넣으면, 기본 설정된 sm:max-w-lg가 더 구체적인 조건(미디어 쿼리)으로 인식되어 우선순위에서 밀릴 수 있음.
          따라서 같은 조건인 sm:을 붙여서 덮어쓰면 ! 없이도 적용됨. */}
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board."
                className={styles.dialog__titleBox__title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label="From" />
            <LabelCalendar label="To" />
          </div>
          <Separator />
          <div className={styles.dialog__markdown}>
            <MDEditor
              value={content}
              height={100 + "%"}
              onChange={setContent}
            />
          </div>
        </DialogHeader>

        <DialogFooter>
          <div className={styles.dialog__buttonBox}>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type={"submit"}
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
              onClick={onSubmit}
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
