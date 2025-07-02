
import { onAuthenticateUser } from "@/app/dashboard/action/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
    // const router = useRouter();
    
    // router.refresh();
    const auth = await onAuthenticateUser();
    if (auth.status === 403) return redirect('/dashboard/auth/callback')
    if (auth.status === 200 ) {
        
        if (auth.user?.workspace?.[0]) {
            return redirect(`/dashboard/${auth.user.workspace[0].id}`);
          }
    }

    if ( auth.status === 400 || auth.status === 500) {
        return redirect(`/nahchalraha`);
    }

};
  export default AuthCallbackPage 