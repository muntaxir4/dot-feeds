import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BlogCardProps {
  title?: string;
  content?: string;
  authorId?: string;
  updatedAt?: Date;
}

export default function BlogCard({
  title,
  content,
  authorId,
  updatedAt,
}: BlogCardProps) {
  const whenPosted = Math.floor(
    (Date.now() - new Date(updatedAt as Date).getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <Card className="shadow-sm rounded-xl backdrop-blur-lg inset-2 dark:shadow-slate-400 bg-gradient-to-r from-gray-100 to-gray-300  dark:bg-gradient-to-r dark:from-slate-500 dark:to-slate-800">
      <CardHeader>
        <CardTitle>{title ?? "My first Blog"}</CardTitle>
        <CardDescription>
          {whenPosted} {whenPosted <= 1 ? "day" : "days"} ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {content ??
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur culpa illum, modi inventore sit temporibus perspiciatis harum iure eos soluta! Dolorem deserunt natus amet ad perferendis blanditiis? Cupiditate, ab hic."}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/blog/${title}`} className=" text-sm">
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
