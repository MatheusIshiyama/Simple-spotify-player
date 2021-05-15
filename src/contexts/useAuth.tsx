import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export function useAuth(code: string) {
    const [accessToken, setAccessToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [expiresIn, setExpiresIn] = useState<number>();

    const router = useRouter();

    useEffect(() => {
        axios
            .post("api/auth", { code })
            .then((response) => {
                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);
                setExpiresIn(response.data.expiresIn);
                window.history.pushState({}, null, "/auth");
            })
            .catch(() => {
                router.push("/");
            });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            axios
                .post("api/refresh", {
                    refreshToken,
                })
                .then((response) => {
                    setAccessToken(response.data.accessToken);
                    setExpiresIn(response.data.expiresIn);
                    window.history.pushState({}, null, "/auth");
                })
                .catch(() => {
                    router.push("/");
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
