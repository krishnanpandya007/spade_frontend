import { useEffect, useState } from "react";

export default function useDebouncedValue(initial_state, callback_fn, delay=500){

    /*

    @args: initial_state, callback_fn => void, delay(ms)
    @callback_call_condition: oly if current value != initial_state(provided hardcoded)

    Default Delay is 500ms

    */

    const [value, setValue] = useState(initial_state)

    useEffect(() => {

        const timer = setTimeout(value !== initial_state && callback_fn, delay);
        
        return () => {

            clearTimeout(timer);

        }

    }, [value])

    return [value, setValue]

}