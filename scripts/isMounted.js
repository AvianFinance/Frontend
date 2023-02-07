import { useEffect, useState } from "react";

export function isMounted() {
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        setmounted(true)
    }, []);

    return mounted
}