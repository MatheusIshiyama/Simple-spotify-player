import { useRouter } from "next/router";
import { useAuth } from "../contexts";

export default function Auth() {
    const router = useRouter();
    const { code } = router.query;

    const accessToken = useAuth(String(code));

    return <div>accessToken = {accessToken}</div>;
}
