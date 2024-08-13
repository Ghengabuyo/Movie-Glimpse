
import { useState } from 'react';
import nameContext from './nameContext'

function NameProvider({ children }) {

    const [displayName, setDisplayName] = useState('');

    const value = {
        displayName,
        setDisplayName
    }

    return (
        <>
            <nameContext.Provider value={value}>{children}</nameContext.Provider>
        </>

    );
}

export default NameProvider;