import React, {useCallback, useEffect, useState} from 'react';

const UseCallbackComponent: React.FC = () => {
    const [{a, b}, updateState] = useState<{a: number, b: number}>({a: 12, b: 15})

    useEffect(() => {
        console.log('UseEffectCalled');
      setTimeout(() => {
          console.log('Updating the state')
          updateState({a: 10, b: 12})
      }, 1000)
    }, [a, b])

    const pretty = useCallback(() => {
        console.log(`executing callback with (a -> ${a}, b -> ${b})`)
        return `a -> ${a}; b -> ${b}`
    }, [a, b]);

    return <div>{pretty()}</div>
};

export {UseCallbackComponent};
