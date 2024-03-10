"use client";

import { createBrowserClient } from '@supabase/ssr'
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function LoginForm(){
    const pathname = usePathname()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

    const handleLogin = () => {
		supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: location.origin + "/auth/callback?next=" + pathname
            }
        })
	};
    return (
        <Button
			className="flex items-center gap-2"
			variant="outline"
            onClick={handleLogin}
		>
			<Github/> Login
		</Button>
    )
}