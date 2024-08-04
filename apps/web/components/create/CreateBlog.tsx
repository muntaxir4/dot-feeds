import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlogContent from "./BlogContent";

export default function CreateBlog() {
  return (
    <div className="m-2 grid sm:grid-cols-[75%_1fr]">
      <div className="mx-3 sm:mx-8">
        <div>
          <Label htmlFor="title" className="tracking-widest text-xl">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            className="border-primary text-lg focus-visible:ring-offset-1 dark:bg-slate-700"
          />
        </div>
        <div className=" my-4">
          <Label htmlFor="content" className="tracking-widest text-xl">
            Content
          </Label>
          <BlogContent />
        </div>
      </div>
      <div></div>
    </div>
  );
}
