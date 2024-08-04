"use client";

// src/Tiptap.tsx
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import lowlight from "lowlight";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { List, ListOrdered, Redo, Undo } from "lucide-react";
import { useState } from "react";

import InsertImage, { imageInputElement } from "./InsertImage";

function BlogContentHeader({
  editor,
  isCursorChange,
}: {
  editor: Editor;
  isCursorChange: number;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("bold") ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <strong>B</strong>
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("italic") ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <i>I</i>
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("strike") ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <s>S</s>
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("underline") ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      >
        <u>U</u>
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("code") ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        Code
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("bulletList")
            ? "default"
            : "outline"
        }
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      >
        <List />
      </Button>
      <Button
        size={"xs"}
        variant={
          isCursorChange && editor.isActive("orderedList")
            ? "default"
            : "outline"
        }
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Button>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size={"xs"}
            variant={
              isCursorChange && editor.isActive("codeblock")
                ? "default"
                : "outline"
            }
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          >
            {"<>"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Code Block</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size={"xs"}
            variant="outline"
            onClick={() => imageInputElement?.click()}
          >
            Insert Image
            <InsertImage editor={editor} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Insert Image</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function BlogContentFooter({ editor }: { editor: Editor }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 text-sm">
        <p>{editor.storage.characterCount.characters()} characters,</p>
        <p>{editor.storage.characterCount.words()} words</p>
      </div>
      <div className="flex gap-2 text-sm">
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"xs"}
              variant={"outline"}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"xs"}
              variant={"outline"}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default function BlogContent() {
  const [isCursorChange, setIsCursorChange] = useState(0);
  const editor = useEditor({
    editorProps: {
      attributes: {
        id: "content",
        name: "content",
        class: "p-2 border border-primary rounded-md min-h-64",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      CharacterCount,
      CodeBlock.configure({
        HTMLAttributes: {
          class: " rounded-md p-2  bg-slate-800 text-slate-100",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md p-2 px-4 sm:px-12",
        },
      }),
    ],
    content: "<p>Hello World!</p>",
  });
  if (!editor) return null;
  return (
    <div className="flex flex-col gap-3 p-2 border border-primary rounded-md dark:bg-slate-700 ">
      <BlogContentHeader editor={editor} isCursorChange={isCursorChange} />
      <EditorContent
        id="content"
        name="content"
        editor={editor}
        onMouseUp={() => setIsCursorChange((prev) => ((prev + 1) % 10) + 1)}
      />
      <BlogContentFooter editor={editor} />
    </div>
  );
}
