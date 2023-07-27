import {useEffect} from "react";

export const useDebounce = (callback, timeout, debounceElement) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            callback()
        }, timeout);
        return () => clearTimeout(timeoutId);
    }, [debounceElement]);
}
