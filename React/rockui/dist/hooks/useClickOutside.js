import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        window.addEventListener('click', listener);
        return function () {
            window.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;