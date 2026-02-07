"use client";
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
// CSS
import styles from "./MarkdownDialog.module.scss";
import { useState } from "react";

function MarkdownDialog() {
  const [contents, setContents] = useState<string | undefined>(
    "**Hello, world!!**",
  );
  return (
    <Dialog>
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
              value={contents}
              height={100 + "%"}
              onChange={setContents}
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
