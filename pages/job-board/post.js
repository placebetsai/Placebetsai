import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PostRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/job-board"); }, [router]);
  return null;
}
