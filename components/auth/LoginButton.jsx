import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export const LoginButton = () => {
    return (
        <Button
            onClick={async () => {
                await signIn('github', {
                    callbackUrl: `${window.location.origin}`,
                });
            }}
            >
            Login with Github
        </Button>
    );
}