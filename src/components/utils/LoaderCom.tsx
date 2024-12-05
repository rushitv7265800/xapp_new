import { useSelector } from 'react-redux';
import { isLoading } from './allSelector';
import { useEffect } from 'react';

const Loader = () => {


    const roleLoader = useSelector(isLoading)

    useEffect(() => {
        console.log("roleLoader", roleLoader)
    }, [roleLoader])

    return (
        <>
            {roleLoader && (
                <div className='loader'>
                    <div className='loaderShow'>
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Loader;